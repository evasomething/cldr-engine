import { CalendarSchema, DayPeriodType, Schema } from '@phensley/cldr-schema';
import { CalendarInternals } from '../internals';
import { calendarIds, calendarPrefData } from './autogen.calprefs';
import { weekFirstDay, weekMinDays } from './autogen.weekdata';
import { Bundle } from '../../resource';
import { DateFormatOptions, DateIntervalFormatOptions } from '../../common/calendars';
import { DateFormatRequest, DateIntervalFormatRequest, NumberParams } from '../../common/private';
import { CalendarDate, CalendarType } from '../../systems/calendars';
import { Renderer } from '../../utils/render';
import { CalendarContext, CalendarFormatter } from './formatter';
import { CalendarManager } from './manager';
import { Internals } from '../internals';
import { Cache } from '../../utils/cache';
import { DateTimeNode, intervalPatternBoundary, parseDatePattern } from '../../parsing/patterns/date';
import { DayPeriodRules } from './rules';

/**
 * Framework scoped calendar functions.
 */
export class CalendarInternalsImpl implements CalendarInternals {

  readonly schema: Schema;
  readonly dayPeriodRules: DayPeriodRules;
  readonly patternCache: Cache<DateTimeNode[]>;
  readonly hourPatternCache: Cache<[DateTimeNode[], DateTimeNode[]]>;
  readonly calendarFormatterCache: Cache<CalendarFormatter<CalendarDate>>;

  constructor(
    readonly internals: Internals,
    readonly cacheSize: number = 50
  ) {
    this.schema = internals.schema;
    this.dayPeriodRules = new DayPeriodRules(cacheSize);
    this.patternCache = new Cache(parseDatePattern, cacheSize);

    this.hourPatternCache = new Cache((raw: string): [DateTimeNode[], DateTimeNode[]] => {
      const parts = raw.split(';');
      return [this.patternCache.get(parts[0]), this.patternCache.get(parts[1])];
    }, cacheSize);

    this.calendarFormatterCache = new Cache((calendar: string) => {
      let s: CalendarSchema;
      switch (calendar) {
        case 'buddhist':
          s = this.schema.Buddhist;
          break;
        case 'japanese':
          s = this.schema.Japanese;
          break;
        case 'persian':
          s = this.schema.Persian;
          break;
        case 'iso8601':
        case 'gregory':
        default:
          s = this.schema.Gregorian;
          break;
      }
      return new CalendarFormatter(this.internals, s);
    }, cacheSize);
  }

  flexDayPeriod(bundle: Bundle, minutes: number): DayPeriodType | undefined {
    return this.dayPeriodRules.get(bundle, minutes);
  }

  getCalendarFormatter(type: CalendarType): CalendarFormatter<CalendarDate> {
    return this.calendarFormatterCache.get(type);
  }

  parseDatePattern(raw: string): DateTimeNode[] {
    return this.patternCache.get(raw);
  }

  getHourPattern(raw: string, negative: boolean): DateTimeNode[] {
    const patterns = this.hourPatternCache.get(raw);
    return patterns[negative ? 1 : 0];
  }

  weekFirstDay(region: string): number {
    return weekFirstDay[region] || weekFirstDay['001'];
  }

  weekMinDays(region: string): number {
    return weekMinDays[region] || weekMinDays['001'];
  }

  formatDateTime<R>(
      calendar: CalendarType, ctx: CalendarContext<CalendarDate>, renderer: Renderer<R>,
      date?: DateTimeNode[], time?: DateTimeNode[], wrapper?: string): R {

    const formatter = this.internals.calendars.getCalendarFormatter(calendar);
    let _date: R | undefined;
    let _time: R | undefined;
    if (date) {
      formatter.format(renderer, ctx, date);
      _date = renderer.get();
    }
    if (time) {
      formatter.format(renderer, ctx, time);
      _time = renderer.get();
    }
    if (_date && _time && wrapper) {
      const pattern = this.internals.wrapper.parseWrapper(wrapper);
      renderer.wrap(pattern, [_time, _date]);
      return renderer.get();
    }
    return _date ? _date : _time ? _time : renderer.empty();
  }

  formatInterval<R>(calendar: CalendarType, bundle: Bundle, params: NumberParams, renderer: Renderer<R>,
    start: CalendarDate, end: CalendarDate, pattern: DateTimeNode[]): R {

    const idx = intervalPatternBoundary(pattern);
    const ctx = { date: start, bundle, numberSystem: params.numberSystem };
    const s = this.formatDateTime(calendar, ctx, renderer, pattern.slice(0, idx));
    ctx.date = end;
    const e = this.formatDateTime(calendar, ctx, renderer, pattern.slice(idx));
    return renderer.join(s, e);
  }

  selectCalendar(bundle: Bundle, ca?: CalendarType): CalendarType {
    let calendar = this.supportedCalendar(ca) || this.supportedCalendar(bundle.calendarSystem());
    if (!calendar) {
      const prefs = calendarPrefData[bundle.region()] || calendarPrefData['001'];
      for (const id of prefs) {
        calendar = this.supportedCalendar(calendarIds[id]);
        if (calendar) {
          return calendar;
        }
      }
      return 'gregory';
    }
    return calendar;
  }

  /**
   * Translates a string into a supported calendar type, or undefined if none match.
   */
  protected supportedCalendar(c: string | undefined): CalendarType | undefined {
    switch (c) {
    case 'buddhist':
    case 'iso8601':
    case 'japanese':
    case 'persian':
    case 'gregory':
      return c;
    case 'gregorian':
      return 'gregory';
    default:
      return undefined;
    }
  }
}
