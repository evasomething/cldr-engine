## API Report File for "@phensley/messageformat"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Decimal } from '@phensley/decimal';
import { PluralRules } from '@phensley/plurals';

// @public
export type Argument = string | number;

// @public
export const buildMessageMatcher: (names: string[], sticky?: boolean) => StickyMatcher;

// @public
export class DefaultMessageArgConverter implements MessageArgConverter {
    asDecimal(arg: MessageArg | undefined): Decimal;
    asString(arg: MessageArg | undefined): string;
}

// @public
export type MessageArg = any;

// @public
export interface MessageArgCode {
    // (undocumented)
    [0]: MessageOpType.ARG;
    // (undocumented)
    [1]: Argument;
}

// @public
export interface MessageArgConverter {
    // (undocumented)
    asDecimal(arg: MessageArg | undefined): Decimal;
    // (undocumented)
    asString(arg: MessageArg | undefined): string;
}

// @public
export type MessageArgs = {
    positional: MessageArg[];
    named: MessageNamedArgs;
};

// @public
export interface MessageArgSubCode {
    // (undocumented)
    [0]: MessageOpType.ARGSUB;
}

// @public
export interface MessageBlockCode {
    // (undocumented)
    [0]: MessageOpType.BLOCK;
    // (undocumented)
    [1]: MessageCode[];
}

// @public
export type MessageCode = MessageArgCode | MessageTextCode | MessagePluralCode | MessageBlockCode | MessageSelectCode | MessageSimpleCode | MessageArgSubCode | MessageNoopCode;

// @public
export class MessageEngine {
    constructor(plurals: PluralRules, converter: MessageArgConverter, formatters: MessageFormatFuncMap, code: MessageCode);
    evaluate(positional: MessageArg[], named?: MessageNamedArgs): string;
    }

// @public
export type MessageFormatFunc = (args: MessageArg[], options: string[]) => string;

// @public
export type MessageFormatFuncMap = {
    [name: string]: MessageFormatFunc;
};

// @public
export class MessageFormatter {
    constructor(options?: MessageFormatterOptions);
    format(message: string, positional: MessageArg[], named: MessageNamedArgs): string;
    toString(): string;
}

// @public
export interface MessageFormatterOptions {
    cacheSize?: number;
    converter?: MessageArgConverter;
    formatters?: MessageFormatFuncMap;
    language?: string;
    plurals?: PluralRules;
    region?: string;
}

// @public
export interface MessageMatcher {
    arguments(r: MessageState): (number | string)[] | undefined;
    char(r: MessageState): string;
    complete(r: MessageState): boolean;
    formatter(r: MessageState): string | undefined;
    identifier(r: MessageState): string | undefined;
    options(r: MessageState): string[];
    pluralChoice(r: MessageState): string | undefined;
    pluralOffset(r: MessageState): number;
    spaces(r: MessageState): boolean;
}

// @public
export type MessageNamedArgs = {
    [s: string]: MessageArg;
    [n: number]: MessageArg;
};

// @public
export interface MessageNoopCode {
    // (undocumented)
    [0]: MessageOpType.NOOP;
}

// @public
export const enum MessageOpType {
    // (undocumented)
    ARG = 1,
    // (undocumented)
    ARGSUB = 7,
    // (undocumented)
    BLOCK = 4,
    // (undocumented)
    NOOP = 5,
    // (undocumented)
    PLURAL = 2,
    // (undocumented)
    SELECT = 3,
    // (undocumented)
    SIMPLE = 6,
    // (undocumented)
    TEXT = 0
}

// @public
export interface MessagePluralCode {
    // (undocumented)
    [0]: MessageOpType.PLURAL;
    // (undocumented)
    [1]: Argument[];
    // (undocumented)
    [2]: number;
    // (undocumented)
    [3]: PluralNumberType;
    // (undocumented)
    [4]: PluralChoice[];
}

// @public
export interface MessageSelectCode {
    // (undocumented)
    [0]: MessageOpType.SELECT;
    // (undocumented)
    [1]: Argument[];
    // (undocumented)
    [2]: SelectChoice[];
}

// @public
export interface MessageSimpleCode {
    // (undocumented)
    [0]: MessageOpType.SIMPLE;
    // (undocumented)
    [1]: string;
    // (undocumented)
    [2]: Argument[];
    // (undocumented)
    [3]: string[];
}

// @public
export interface MessageState {
    // (undocumented)
    e: number;
    // (undocumented)
    s: number;
    // (undocumented)
    t: string;
}

// @public
export interface MessageTextCode {
    // (undocumented)
    [0]: MessageOpType.TEXT;
    // (undocumented)
    [1]: string;
}

// @public
export const parseMessagePattern: (raw: string, matcher: MessageMatcher) => MessageCode;

// @public
export interface PluralCategoryChoice {
    // (undocumented)
    [0]: PluralChoiceType.CATEGORY;
    // (undocumented)
    [1]: string;
    // (undocumented)
    [2]: MessageCode;
}

// @public
export type PluralChoice = PluralExactChoice | PluralCategoryChoice;

// @public
export const enum PluralChoiceType {
    // (undocumented)
    CATEGORY = 1,
    // (undocumented)
    EXACT = 0
}

// @public
export interface PluralExactChoice {
    // (undocumented)
    [0]: PluralChoiceType.EXACT;
    // (undocumented)
    [1]: string;
    // (undocumented)
    [2]: MessageCode;
}

// @public
export const enum PluralNumberType {
    // (undocumented)
    CARDINAL = 0,
    // (undocumented)
    ORDINAL = 1
}

// @public
export type regexpFunc = (pattern: string) => RegExp;

// @public
export interface SelectChoice {
    // (undocumented)
    [0]: string;
    // (undocumented)
    [1]: MessageCode;
}

// @public
export class StickyMatcher implements MessageMatcher {
    constructor(formatters: string[], compile: regexpFunc);
    // (undocumented)
    arguments(r: MessageState): (number | string)[] | undefined;
    // (undocumented)
    char(r: MessageState): string;
    // (undocumented)
    complete(r: MessageState): boolean;
    // (undocumented)
    formatter(r: MessageState): string | undefined;
    // (undocumented)
    identifier(r: MessageState): string | undefined;
    match(pattern: RegExp, r: MessageState): string | undefined;
    // (undocumented)
    options(r: MessageState): string[];
    // (undocumented)
    pluralChoice(r: MessageState): string | undefined;
    // (undocumented)
    pluralOffset(r: MessageState): number;
    // (undocumented)
    spaces(r: MessageState): boolean;
}

// @public
export const stickyRegexp: (pattern: string) => RegExp;

// @public
export class SubstringMatcher extends StickyMatcher {
    // (undocumented)
    match(pattern: RegExp, r: MessageState): string | undefined;
}

// @public
export const substringRegexp: (pattern: string) => RegExp;


// (No @packageDocumentation comment for this package)

```
