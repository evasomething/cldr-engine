import { Decimal } from '@phensley/decimal';
import { numbersApi } from '../../_helpers';

test('cardinals', () => {
  // Main test cases are under engine/plurals. These are here to confirm
  // the public interface is covered.

  let api = numbersApi('en');
  expect(api.getPluralCardinal('0')).toEqual('other');
  expect(api.getPluralCardinal('1')).toEqual('one');
  expect(api.getPluralCardinal('2')).toEqual('other');

  expect(api.getPluralCardinal('1.0')).toEqual('other');
  expect(api.getPluralCardinal('1.5')).toEqual('other');

  expect(api.getPluralCardinal(new Decimal('1.0'))).toEqual('other');
  expect(api.getPluralCardinal(new Decimal('1.5'))).toEqual('other');

  api = numbersApi('fr');
  expect(api.getPluralCardinal('0')).toEqual('one');
  expect(api.getPluralCardinal('1')).toEqual('one');
  expect(api.getPluralCardinal('2')).toEqual('other');
  expect(api.getPluralCardinal('10')).toEqual('other');

  expect(api.getPluralCardinal('1.2')).toEqual('one');
  expect(api.getPluralCardinal('1.7')).toEqual('one');

  api = numbersApi('az');
  expect(api.getPluralCardinal('1')).toEqual('one');
  for (const n of ['0', '2', '3', '4', '5']) {
    expect(api.getPluralCardinal(n)).toEqual('other');
  }
});

test('cardinals with options', () => {
  const api = numbersApi('en');

  expect(api.getPluralCardinal('0.5', { round: 'down' })).toEqual('other');
  expect(api.getPluralCardinal('1', { minimumFractionDigits: 1 })).toEqual('other');

  expect(api.getPluralCardinal('1', { minimumFractionDigits: 0 })).toEqual('one');
  expect(api.getPluralCardinal('1.1', { maximumFractionDigits: 0 })).toEqual('one');
});

test('ordinals', () => {
  let api = numbersApi('en');
  expect(api.getPluralOrdinal('0')).toEqual('other');
  expect(api.getPluralOrdinal('1')).toEqual('one');
  expect(api.getPluralOrdinal('2')).toEqual('two');
  expect(api.getPluralOrdinal('3')).toEqual('few');
  expect(api.getPluralOrdinal('4')).toEqual('other');

  expect(api.getPluralOrdinal('0', { minimumFractionDigits: 1 })).toEqual('other');

  api = numbersApi('fr');
  expect(api.getPluralOrdinal('1')).toEqual('one');
  for (const n of ['0', '2', '3', '4']) {
    expect(api.getPluralOrdinal(n)).toEqual('other');
  }

  api = numbersApi('az');
  for (const n of ['1', '2', '5', '7', '8']) {
    expect(api.getPluralOrdinal(n)).toEqual('one');
  }
  for (const n of ['3', '4']) {
    expect(api.getPluralOrdinal(n)).toEqual('few');
  }
  for (const n of ['0', '6', '16', '26']) {
    expect(api.getPluralOrdinal(n)).toEqual('many');
  }
  for (const n of ['9', '10', '19', '29']) {
    expect(api.getPluralOrdinal(n)).toEqual('other');
  }
});
