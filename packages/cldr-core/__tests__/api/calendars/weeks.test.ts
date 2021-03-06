import { calendarsApi } from '../../_helpers';
import { CalendarsImpl, ZonedDateTime } from '../../../src';

const make = (date: number, zoneId: string): ZonedDateTime => ({ date, zoneId });

const DAY = 86400000;
const NEW_YORK = 'America/New_York';

test('week of month', () => {
  let api: CalendarsImpl;

  api = calendarsApi('en-US');
  expect(api.firstDayOfWeek()).toEqual(1);
  expect(api.minDaysInFirstWeek()).toEqual(1);

  api = calendarsApi('de-BE');
  expect(api.firstDayOfWeek()).toEqual(2);
  expect(api.minDaysInFirstWeek()).toEqual(4);
});

test('week of month', () => {
  const en = calendarsApi('en');
  const fr = calendarsApi('fr');
  let d: ZonedDateTime;
  let base: number;

  // Sunday, April 1, 2018 11:23:34 AM UTC
  base = 1522581814000;
  const opts = { pattern: 'W' };

  d = make(base, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('0');

  d = make(base + DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 2 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 3 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 4 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 5 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 6 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 7 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  // Jump to Apr 28
  d = make(base + 27 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 28 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 29 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('5');

  // Sunday, July 1, 2018 11:23:34 AM UTC
  base = 1530444214000;

  d = make(base, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('0');

  d = make(base + DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 2 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 3 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 4 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 5 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 6 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 7 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  // Jump to Jul 16
  d = make(base + 15 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  d = make(base + 16 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  d = make(base + 17 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  // Jump to Jul 28
  d = make(base + 27 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 28 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 29 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('5');

  // Wednesday, August 1, 2018 12:31:39 PM UTC
  base = 1533126699000;

  d = make(base, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 2 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 3 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 4 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 5 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('2');

  d = make(base + 6 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('2');

  d = make(base + 7 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('2');

  // Jump to Aug 16
  d = make(base + 15 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  d = make(base + 16 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  d = make(base + 17 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('3');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  // Jump to Aug 25
  d = make(base + 24 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 25 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 26 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('5');

  // Saturday, September 1, 2018 12:31:39 PM UTC
  base = 1535805099000;

  d = make(base, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('1');
  expect(fr.formatDateRaw(d, opts)).toEqual('0');

  d = make(base + DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('0');

  d = make(base + 2 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 3 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 4 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 5 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 6 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  d = make(base + 7 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2');
  expect(fr.formatDateRaw(d, opts)).toEqual('1');

  // Jump to Sep 16
  d = make(base + 15 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('2');

  d = make(base + 16 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  d = make(base + 17 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('4');
  expect(fr.formatDateRaw(d, opts)).toEqual('3');

  // Jump to Sep 25
  d = make(base + 24 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 25 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  d = make(base + 26 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('5');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');

  // Jump to Sep 30
  d = make(base + 29 * DAY, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('6');
  expect(fr.formatDateRaw(d, opts)).toEqual('4');
});

test('week of year', () => {
  const en = calendarsApi('en');
  const fr = calendarsApi('fr');
  let d: ZonedDateTime;

  const opts = { pattern: 'Y w' };
  // const iso = { pattern: 'Y w', ca: 'iso8601' };

  // Jan 1, 2003
  d = make(1041414129000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2003 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2003 1');

  // Dec 31, 2003
  d = make(1072863729000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2004 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2004 1');

  // Jan 1, 2004
  d = make(1072956214000, NEW_YORK);
  expect(en.formatDateRaw(d, { pattern: 'Y w' })).toEqual('2004 1');
  expect(en.formatDateRaw(d, { pattern: 'Y ww' })).toEqual('2004 01');
  expect(en.formatDateRaw(d, { pattern: 'YY ww' })).toEqual('04 01');

  expect(fr.formatDateRaw(d, { pattern: 'Y w' })).toEqual('2004 1');
  expect(fr.formatDateRaw(d, { pattern: 'Y ww' })).toEqual('2004 01');
  expect(fr.formatDateRaw(d, { pattern: 'YY ww' })).toEqual('04 01');

  // Dec 31, 2004
  d = make(1104504129000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2005 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2004 53');

  // Jan 1, 2005
  d = make(1104590529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2005 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2004 53');

  // Dec 31, 2005
  d = make(1136040129000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2005 53');
  expect(fr.formatDateRaw(d, opts)).toEqual('2005 52');

  // Jan 1, 2006
  d = make(1136126529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2006 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2005 52');

  // Dec 31, 2006
  d = make(1167576129000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2007 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2006 52');

  // Jan 1, 2007
  d = make(1167662529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2007 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2007 1');

  // Dec 31, 2007
  d = make(1199112129000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2008 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2008 1');

  // Jan 1, 2008
  d = make(1199198529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2008 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2008 1');

  // Dec 31, 2008
  d = make(1230734529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2009 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2009 1');

  // Jan 1, 2009
  d = make(1230820929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2009 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2009 1');

  // Dec 31, 2009
  d = make(1262270529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2010 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2009 53');

  // Jan 1, 2010
  d = make(1262356929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2010 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2009 53');

  // Dec 31, 2010
  d = make(1293806529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2011 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2010 52');

  // Jan 1, 2011
  d = make(1293892929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2011 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2010 52');

  // Dec 31, 2011
  d = make(1325342529000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2011 53');
  expect(fr.formatDateRaw(d, opts)).toEqual('2011 52');

  // Jan 1, 2012
  d = make(1325428929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2012 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2011 52');

  // Dec 31, 2012
  d = make(1356964929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2013 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2013 1');

  // Jan 1, 2013
  d = make(1357051329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2013 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2013 1');

  // Dec 31, 2013
  d = make(1388500929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2014 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2014 1');

  // Jan 1, 2014
  d = make(1388587329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2014 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2014 1');

  // Dec 31, 2014
  d = make(1420036929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2015 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2015 1');

  // Jan 1, 2015
  d = make(1420123329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2015 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2015 1');

  // Dec 31, 2015
  d = make(1451572929000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2016 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2015 53');

  // Jan 1, 2016
  d = make(1451659329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2016 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2015 53');

  // Dec 31, 2016
  d = make(1483195329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2016 53');
  expect(fr.formatDateRaw(d, opts)).toEqual('2016 52');

  // Jan 1, 2017
  d = make(1483281729000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2017 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2016 52');

  // Dec 31, 2017
  d = make(1514731329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2018 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2017 52');

  // Jan 1, 2018
  d = make(1514817729000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2018 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2018 1');

  // Dec 31, 2018
  d = make(1546267329000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2019 1');
  expect(fr.formatDateRaw(d, opts)).toEqual('2019 1');

  // Jan 1, 2019
  d = make(1546318800000, NEW_YORK);
  expect(en.formatDateRaw(d, opts)).toEqual('2019 1');
  expect(en.formatDateRaw(d, opts)).toEqual('2019 1');
});
