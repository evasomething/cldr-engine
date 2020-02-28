## API Report File for "@phensley/language-tag"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @alpha
export class LanguageTag {
    constructor(language?: string, script?: string, region?: string, variant?: string, extensions?: {
        [x: string]: string[];
    }, privateUse?: string);
    compact(): string;
    // (undocumented)
    protected _compact?: string;
    // (undocumented)
    protected core: (undefined | string)[];
    expanded(): string;
    // (undocumented)
    protected _expanded?: string;
    extensions(): {
        [x: string]: string[];
    };
    // (undocumented)
    protected _extensions: {
        [x: string]: string[];
    };
    extensionSubtags(key: string): string[];
    hasLanguage(): boolean;
    hasRegion(): boolean;
    hasScript(): boolean;
    language(): string;
    privateUse(): string;
    // (undocumented)
    protected _privateUse: string;
    region(): string;
    script(): string;
    toString(): string;
    variant(): string;
}

// @public (undocumented)
export const enum LanguageTagField {
    // (undocumented)
    LANGUAGE = 0,
    // (undocumented)
    REGION = 2,
    // (undocumented)
    SCRIPT = 1,
    // (undocumented)
    VARIANT = 3
}

// Warning: (ae-incompatible-release-tags) The symbol "parseLanguageTag" is marked as @public, but its signature references "LanguageTag" which is marked as @alpha
//
// @public
export const parseLanguageTag: (str: string) => LanguageTag;

// Warning: (ae-forgotten-export) The symbol "FastTag" needs to be exported by the entry point index.d.ts
//
// @public
export const substituteRegionAliases: (dst: FastTag) => void;


// (No @packageDocumentation comment for this package)

```