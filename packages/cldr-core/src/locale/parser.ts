import { LanguageTag } from './languagetag';
import { replaceRegion } from './util';
import { stringToObject } from '../utils/string';
import * as subtags from './autogen.subtags';

// Subtag separator
const SEP = '-';
const UNDERSCORE = /_/g;

// ISO 639 language code
const LANGUAGE = /^[a-z]{2,8}$/;

// Selected ISO 639 codes
const EXTLANG = /^[a-z]{3}$/i;

// ISO 15924 script code
const SCRIPT = /^[a-z]{4}$/i;

// ISO 3166-1 or UN M.49 code
const REGION = /^([a-z]{2,3}|\d{3})$/i;

// Registered variants
const VARIANT = /^([a-z\d]{5,8}|\d[a-z\d]{3})$/i;

const EXTENSION_PREFIX = /^[\da-wyz]$/i;
const EXTENSION_SUBTAG = /^[\da-z]{2,8}$/i;
const PRIVATEUSE_PREFIX = /^x$/i;
const PRIVATEUSE_SUBTAG = /^[\da-z]{1,8}$/i;

// Grandfathered irregular and regular tags from IANA registry.
const GRANDFATHERED_TAGS: { [x: string]: string } = {
  ...stringToObject(subtags.grandfatheredRaw, '|', ':'),

  // Additional fallbacks from ICU
  'cel-gaulish': 'xtg-x-cel-gaulish',
  'en-GB-oed': 'en-GB-x-oed',
  'i-default': 'en-x-i-default',
  'i-enochian': 'und-x-i-enochian',
  'i-mingo': 'see-x-i-mingo',
  'zh-min': 'nan-x-zh-min'
};

/**
 * Match the first element of the parts array against the given pattern.
 * Shifts the first element and returns the match, or returns null.
 */
const match = (parts: string[], pattern: RegExp): string | undefined => {
  if (parts.length > 0) {
    const m = parts[0].match(pattern);
    if (m !== null) {
      parts.shift();
      return m[0];
    }
  }
  return undefined;
};

/**
 * Parses a string into a series of language tag fields.
 */
class LanguageTagParser {

  private language?: string;
  private script?: string;
  private region?: string;
  private extlangs: string[] = [];
  private variants: string[] = [];
  private extensions: string[] = [];
  private privateUse: string = '';

  private str: string;
  // private errors: string[] = [];

  constructor(str: string) {
    this.str = str;
  }

  /**
   * Parse the string and return a language tag object.
   */
  parse(): LanguageTag {
    const str = this.str.indexOf('_') === -1 ? this.str : this.str.replace(UNDERSCORE, SEP);
    const preferred = GRANDFATHERED_TAGS[str.toLowerCase()];
    const parts = typeof preferred === 'string' ? preferred.split(SEP) : str.split(SEP);

    if (this.parseLanguage(parts)) {
      this.parseExtLangs(parts);
      this.parseScript(parts);
      this.parseRegion(parts);
      this.parseVariants(parts);
      this.parseExtensions(parts);
    }
    this.parsePrivateUse(parts);

    // If no region was parsed, check if one of the extlangs is actually a valid ISO 3166
    if (this.region === undefined) {
      for (let i = 0; i < this.extlangs.length; i++) {
        const replacement = replaceRegion(this.extlangs[i].toUpperCase());
        if (replacement !== undefined) {
          this.region = replacement;
          // Ignore the extlangs since we currently don't add them to the LanguageTag.
          break;
        }
      }
    }

    return new LanguageTag(
      this.language,
      this.script,
      this.region,
      this.variants.length === 0 ? undefined : this.variants[0],
      this.extensions,
      this.privateUse
    );
  }

  private parseLanguage(parts: string[]): boolean {
    this.language = match(parts, LANGUAGE);
    return this.language !== undefined;
  }

  private parseExtLangs(parts: string[]): boolean {
    while (parts.length !== 0) {
      const result = match(parts, EXTLANG);
      if (result === undefined) {
        break;
      }
      this.extlangs.push(result);
    }
    return this.extlangs.length !== 0;
  }

  private parseScript(parts: string[]): boolean {
    this.script = match(parts, SCRIPT);
    return this.script !== undefined;
  }

  private parseRegion(parts: string[]): boolean {
    this.region = match(parts, REGION);
    return this.region !== undefined;
  }

  private parseVariants(parts: string[]): boolean {
    while (parts.length > 0) {
      const result = match(parts, VARIANT);
      if (result === undefined) {
        break;
      }
      this.variants.push(result);
    }
    return this.variants.length !== 0;
  }

  private parseExtensions(parts: string[]): boolean {
    while (parts.length > 0) {
      const prefix = match(parts, EXTENSION_PREFIX);
      if (prefix === undefined) {
        break;
      }
      const subs = [];
      while (parts.length > 0) {
        const subtag = match(parts, EXTENSION_SUBTAG);
        if (subtag === undefined) {
          break;
        }
        subs.push(subtag);
      }
      if (subs.length > 0) {
        this.extensions.push(`${prefix}${SEP}${subs.join(SEP)}`);
      }
    }
    return this.extensions.length !== 0;
  }

  private parsePrivateUse(parts: string[]): boolean {
    while (parts.length > 0) {
      const prefix = match(parts, PRIVATEUSE_PREFIX);
      if (prefix === undefined) {
        break;
      }
      const subs = [];
      while (parts.length > 0) {
        const subtag = match(parts, PRIVATEUSE_SUBTAG);
        if (subtag === undefined) {
          break;
        }
        subs.push(subtag);
      }

      if (subs.length > 0) {
        this.privateUse += `${prefix}${SEP}${subs.join(SEP)}`;
      }
    }
    return this.privateUse !== undefined;
  }

}

/**
 * Low-level parsing of a language tag. No resolution is performed.
 */
export const parseLanguageTag = (str: string) => {
  const parser = new LanguageTagParser(str);
  return parser.parse();
};
