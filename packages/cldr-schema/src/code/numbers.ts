import { Choice, Scope, digits, field, objectmap, scope } from './instructions';
import { NumberSymbolValues } from '../schema/numbers';

export const NUMBERS: Scope = scope('Numbers', 'Numbers', [
  objectmap('symbols', NumberSymbolValues),

  field('minimumGroupingDigits', 'minimumGroupingDigits'),

  scope('currencyFormats', 'currencyFormats', [
    field('standard', 'standard'),
    field('accounting', 'accounting'),

    scope('short', 'short', [
      digits('standard')
    ]),

    field('unitPattern', 'unitPattern', Choice.PLURAL)
  ]),

  scope('decimalFormats', 'decimalFormats', [
    field('standard', 'standard'),

    scope('short', 'short', [
      digits('decimalFormat')
    ]),

    scope('long', 'long', [
      digits('decimalFormat')
    ])
  ]),

  scope('percentFormats', 'percentFormats', [
    field('standard', 'standard')
  ])
]);
