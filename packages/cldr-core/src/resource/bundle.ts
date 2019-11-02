import { PrimitiveBundle } from '@phensley/cldr-types';
import { LanguageTag } from '../locale';

export type ExceptionIndex = { [y: number]: number };

export interface Bundle extends PrimitiveBundle {
  tag(): LanguageTag;
  calendarSystem(): string;
  numberSystem(): string;
  languageScript(): string;
  languageRegion(): string;
  spellout(): any;
}

export class StringBundle implements Bundle {

  // Properties for fast internal lookups into maps.
  // For example, extended day periods cover all of 'es' except for 'es-CO'.
  // Pre-computing these to avoid string creation for lookups at runtime.
  private _languageRegion: string;
  private _languageScript: string;

  // Empty string will select the preferred calendar for the region.
  private _calendarSystem: string = '';
  private _numberSystem: string = 'default';

  constructor(
    readonly _id: string,
    readonly _tag: LanguageTag,
    readonly strings: string[],
    readonly exceptions: string[],
    readonly index: ExceptionIndex,
    readonly _spellout: any
  ) {
    const language = _tag.language();
    this._languageRegion = `${language}-${_tag.region()}`;
    this._languageScript = `${language}-${_tag.script()}`;

    // When bundle is constructed, see if there are unicode extensions for
    // number and calendar systems.
    for (const subtag of _tag.extensionSubtags('u')) {
      if (subtag.startsWith('nu-')) {
        this._numberSystem = subtag.substring(3);
      } else if (subtag.startsWith('ca-')) {
        this._calendarSystem = subtag.substring(3);
      }
    }
  }

  id(): string {
    return this._id;
  }

  tag(): LanguageTag {
    return this._tag;
  }

  language(): string {
    return this._tag.language();
  }

  region(): string {
    return this._tag.region();
  }

  languageScript(): string {
    return this._languageScript;
  }

  languageRegion(): string {
    return this._languageRegion;
  }

  calendarSystem(): string {
    return this._calendarSystem;
  }

  numberSystem(): string {
    return this._numberSystem;
  }

  get(offset: number): string {
    // If there is an exception index, attempt to resolve it.
    if (this.index !== undefined) {
      const i = this.index[offset];
      if (i !== undefined) {
        return this.exceptions[i] || '';
      }
    }

    // Return the actual string.
    return this.strings[offset] || '';
  }

  /**
   * Group of spellout rules inside this bundle.
   */
  spellout(): any {
    return this._spellout;
  }
}
