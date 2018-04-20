import { languageBundle } from '../../_helpers';
import { buildSchema } from '../../../src/schema';
import {
  Bundle,
  CalendarsImpl,
  InternalsImpl,
  PrivateApiImpl
} from '../../../src';

const INTERNALS = new InternalsImpl();

const privateApi = (bundle: Bundle) => new PrivateApiImpl(bundle, INTERNALS);
const calendarsApi = (tag: string) => {
  const bundle = languageBundle(tag);
  return new CalendarsImpl(bundle, INTERNALS, privateApi(bundle));
};

test('month', () => {
  const en = calendarsApi('en');
  let m = en.months();
  expect(m[2]).toEqual('February');

  m = en.months('persian');
  expect(m[2]).toEqual('Ordibehesht');
});

test('weekdays', () => {
  const en = calendarsApi('en');
  let w = en.weekdays();
  expect(w[2]).toEqual('Monday');

  w = en.weekdays('persian');
  expect(w[2]).toEqual('Monday');
});

test('day periods', () => {
  const en = calendarsApi('en');
  let d = en.dayPeriods();
  expect(d.noon).toEqual('noon');

  d = en.dayPeriods('persian');
  expect(d.noon).toEqual('noon');
});

test('quarter', () => {
  const en = calendarsApi('en');
  let q = en.quarters();
  expect(q[2]).toEqual('2nd quarter');

  q = en.quarters('persian');
  expect(q[2]).toEqual('2nd quarter');
});
