import { languageBundle } from '../../_helpers';
import { buildSchema } from '../../../src/schema';
import {
  Bundle,
  CurrencyFormatOptions,
  Decimal,
  DecimalFormatOptions,
  DecimalFormatStyleType,
  InternalsImpl,
  NumbersImpl,
  Part,
  PrivateApiImpl,
  UnitsImpl
} from '../../../src';

const INTERNALS = new InternalsImpl();

const numbersApi = (tag: string) => {
  const bundle = languageBundle(tag);
  return new NumbersImpl(bundle, INTERNALS, new PrivateApiImpl(bundle, INTERNALS));
};

const unitsApi = (tag: string) => {
  const bundle = languageBundle(tag);
  return new UnitsImpl(bundle, INTERNALS, new PrivateApiImpl(bundle, INTERNALS));
};

test('numbers defaulting', () => {
  let api: NumbersImpl;
  let s: string;
  let p: Part[];

  api = numbersApi('en-u-nu-fullwide');

  s = api.formatDecimal('123.45', { });
  expect(s).toEqual('１２３.４５');

  s = api.formatDecimal('123.45', { nu: 'fullwide' });
  expect(s).toEqual('１２３.４５');

  s = api.formatDecimal('123.45', { nu: 'arab' });
  expect(s).toEqual('١٢٣.٤٥');

  s = api.formatDecimal('123.45', { nu: 'mathmono' });
  expect(s).toEqual('𝟷𝟸𝟹.𝟺𝟻');

  s = api.formatDecimal('123.45', { nu: 'mathsans' });
  expect(s).toEqual('𝟣𝟤𝟥.𝟦𝟧');

  s = api.formatDecimal('123.45678', { style: 'percent', nu: 'mathsans' });
  expect(s).toEqual('𝟣𝟤𝟥𝟦𝟨%');

  s = api.formatDecimal('12345.678', { style: 'short', nu: 'mathsans' });
  expect(s).toEqual('𝟣𝟤K');

  s = api.formatCurrency('123.45', 'USD', { });
  expect(s).toEqual('$１２３.４５');

  s = api.formatCurrency('12345', 'USD', { style: 'code' });
  expect(s).toEqual('１２３４５.００ USD');

  s = api.formatCurrency('12345', 'USD', { style: 'name' });
  expect(s).toEqual('１２３４５.００ US dollars');

  s = api.formatCurrency('12345', 'USD', { style: 'short' });
  expect(s).toEqual('$１２K');

  s = api.formatCurrency('-12345', 'USD', { style: 'accounting' });
  expect(s).toEqual('($１２３４５.００)');

  s = api.formatDecimal('123.45', { nu: 'arab', style: 'long' });
  expect(s).toEqual('١٢٣');

  s = api.formatDecimal('123.45', { nu: 'arab', style: 'percent' });
  expect(s).toEqual('١٢٣٤٥%');

  s = api.formatDecimal('1234567', { nu: 'arab', style: 'long' });
  expect(s).toEqual('١.٢ million');

  s = api.formatDecimal('1234567', { nu: 'arab', style: 'short' });
  expect(s).toEqual('١.٢M');

  s = api.formatDecimal('1234567', { nu: 'arab', style: 'decimal', group: true });
  expect(s).toEqual('١,٢٣٤,٥٦٧');

  s = api.formatCurrency('12345', 'USD', { style: 'code', nu: 'arab' });
  expect(s).toEqual('١٢٣٤٥.٠٠ USD');

  s = api.formatCurrency('12345', 'USD', { style: 'name', nu: 'arab' });
  expect(s).toEqual('١٢٣٤٥.٠٠ US dollars');

  s = api.formatCurrency('12345', 'USD', { style: 'short', nu: 'arab' });
  expect(s).toEqual('١٢٣٤٥');

  s = api.formatCurrency('12345', 'USD', { style: 'symbol', nu: 'arab' });
  expect(s).toEqual('$١٢٣٤٥.٠٠');

  s = api.formatCurrency('-12345', 'USD', { style: 'accounting', nu: 'arab' });
  expect(s).toEqual('($١٢٣٤٥.٠٠)');

  api = numbersApi('en-u-nu-orya');

  s = api.formatDecimal('123.45', { });
  expect(s).toEqual('୧୨୩.୪୫');

  p = api.formatDecimalToParts('123.45', { });
  expect(p).toEqual([
    { type: 'digits', value: '୧୨୩' },
    { type: 'decimal', value: '.' },
    { type: 'digits', value: '୪୫' }
  ]);
});

test('units defaulting', () => {
  let api: UnitsImpl;
  let s: string;
  let p: Part[];

  api = unitsApi('en-u-nu-fullwide');
  s = api.formatQuantity({ value: '17.6789', unit: 'meter' });
  expect(s).toEqual('１７.６７９ meters');

  p = api.formatQuantityToParts({ value: '17.6789', unit: 'meter' });
  expect(p).toEqual([
    { type: 'digits', value: '１７' },
    { type: 'decimal', value: '.' },
    { type: 'digits', value: '６７９' },
    { type: 'literal', value: ' meters' }
  ]);
});