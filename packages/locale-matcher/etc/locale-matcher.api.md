## API Report File for "@phensley/locale-matcher"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { LanguageTag } from '@phensley/language-tag';
import { Locale } from '@phensley/locale';

// @public
export interface LocaleMatch {
    distance: number;
    locale: Locale;
}

// @public
export class LocaleMatcher {
    constructor(supportedLocales: string | (Locale | LanguageTag | string)[], options?: LocaleMatcherOptions);
    match(desiredLocales: string | string[], threshold?: number): LocaleMatch;
    }

// @public
export interface LocaleMatcherOptions {
    resolve?: boolean;
}


// (No @packageDocumentation comment for this package)

```
