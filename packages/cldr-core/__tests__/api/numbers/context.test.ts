import { CurrencyFormatOptions, Decimal, DecimalFormatOptions } from '../../../src';

import { NumberContext } from '../../../src/internals/numbers/context';
import { parseNumberPattern, NumberPattern } from '../../../src/parsing/number';

test('zeros', () => {
  let opts: DecimalFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;
  let n: Decimal;

  pattern = parseNumberPattern('#,##0.###')[0];

  opts = { minimumSignificantDigits: 2 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);

  n = ctx.adjust(new Decimal('0'));
  expect(n.toString()).toEqual('0.0');

  opts = { maximumSignificantDigits: 1, minimumSignificantDigits: 2 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);

  n = ctx.adjust(new Decimal('0'));
  expect(n.toString()).toEqual('0.0');

  pattern = parseNumberPattern('#,##0.000')[0];
  opts = {};
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);

  n = ctx.adjust(new Decimal('0'));
  expect(n.toString()).toEqual('0.000');
});

test('defaulting coverage', () => {
  let opts: DecimalFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;
  let n: Decimal;

  pattern = parseNumberPattern('#,##0.###')[0];

  opts = { minimumFractionDigits: 1, maximumFractionDigits: 3 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  n = ctx.adjust(new Decimal('1.0'));
  expect(n.toString()).toEqual('1.0');
});

test('decimal default', () => {
  let opts: DecimalFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;

  pattern = parseNumberPattern('#,##0.###')[0];

  opts = {};
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(3);

  opts = { minimumFractionDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(1);
  expect(ctx.maxFrac).toEqual(3);

  opts = { maximumFractionDigits: 2 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(2);

  opts = { maximumFractionDigits: 0 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);

  opts = { minimumFractionDigits: 4, maximumFractionDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(1);
  expect(ctx.maxFrac).toEqual(1);

  opts = { maximumFractionDigits: -1, minimumFractionDigits: -1 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(3);

  opts = { maximumFractionDigits: 0 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);

  opts = { minimumFractionDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(5);
  expect(ctx.maxFrac).toEqual(5);
});

test('decimal compact default', () => {
  let opts: DecimalFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;

  pattern = parseNumberPattern('0M')[0];

  opts = {};
  ctx = new NumberContext(opts, 'half-even', true, false, -1);
  ctx.setCompact(pattern, 1, 6);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);

  pattern = parseNumberPattern('000M')[0];
  ctx = new NumberContext(opts, 'half-even', true, false, -1);
  ctx.setCompact(pattern, 3, 6);
  expect(ctx.minInt).toEqual(3);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);

  opts = { minimumFractionDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', true, false, -1);
  ctx.setCompact(pattern, 3, 6);
  expect(ctx.minInt).toEqual(3);
  expect(ctx.minFrac).toEqual(1);
  expect(ctx.maxFrac).toEqual(1);

  opts = { maximumFractionDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', true, false, -1);
  ctx.setCompact(pattern, 3, 6);
  expect(ctx.minInt).toEqual(3);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(1);

  opts = { minimumFractionDigits: -1, maximumFractionDigits: -1 };
  ctx = new NumberContext(opts, 'half-even', true, false, -1);
  ctx.setCompact(pattern, 3, 6);
  expect(ctx.minInt).toEqual(3);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);
});

test('decimal significant', () => {
  let opts: DecimalFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;

  pattern = parseNumberPattern('#,##0.###')[0];

  opts = { minimumSignificantDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(1);
  expect(ctx.maxSig).toEqual(-1);

  opts = { maximumSignificantDigits: 3 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(3);
  expect(ctx.maxSig).toEqual(3);

  opts = { minimumSignificantDigits: 2, maximumSignificantDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(2);
  expect(ctx.maxSig).toEqual(5);

  opts = { minimumSignificantDigits: 5, maximumSignificantDigits: 2 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(5);
  expect(ctx.maxSig).toEqual(5);

  opts = { minimumSignificantDigits: 5, maximumSignificantDigits: -1 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(5);
  expect(ctx.maxSig).toEqual(-1);

  opts = { minimumSignificantDigits: -1, maximumSignificantDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, -1);
  ctx.setPattern(pattern);
  expect(ctx.minSig).toEqual(5);
  expect(ctx.maxSig).toEqual(5);
});

test('currency default', () => {
  let opts: CurrencyFormatOptions;
  let ctx: NumberContext;
  let pattern: NumberPattern;

  pattern = parseNumberPattern('¤#,##0.00')[0];

  opts = {};
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(2);
  expect(ctx.maxFrac).toEqual(2);

  opts = { minimumFractionDigits: 1 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(1);
  expect(ctx.maxFrac).toEqual(2);

  opts = { minimumFractionDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(5);
  expect(ctx.maxFrac).toEqual(5);

  opts = { maximumFractionDigits: 0 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(0);
  expect(ctx.maxFrac).toEqual(0);

  opts = { maximumFractionDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(2);
  expect(ctx.maxFrac).toEqual(5);

  opts = { minimumFractionDigits: 5, maximumFractionDigits: 3 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(3);
  expect(ctx.maxFrac).toEqual(3);

  opts = { minimumFractionDigits: 5, maximumFractionDigits: -1 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(5);
  expect(ctx.maxFrac).toEqual(5);

  opts = { minimumFractionDigits: -1, maximumFractionDigits: 5 };
  ctx = new NumberContext(opts, 'half-even', false, false, 2);
  ctx.setPattern(pattern);
  expect(ctx.minInt).toEqual(1);
  expect(ctx.minFrac).toEqual(2);
  expect(ctx.maxFrac).toEqual(5);
});
