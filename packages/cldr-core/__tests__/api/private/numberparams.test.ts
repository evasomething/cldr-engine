import { languageBundle, INTERNALS } from '../../_helpers';
import { NumberParams } from '../../../src/common/private';
import { NumberParamsCache } from '../../../src/api/private';

const LATN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const internals = INTERNALS();
const getCache = (tag: string) =>
  new NumberParamsCache(languageBundle(tag), internals);

test('number systems', () => {
  const bundle = languageBundle('zh');
  const res = internals.schema.Numbers.numberSystems.mapping(bundle);
  expect(res.finance).toEqual('hansfin');
});

test('number params cache', () => {
  let cache: NumberParamsCache;
  let params: NumberParams;

  cache = getCache('en');
  params = cache.getNumberParams('finance');
  expect(params.digits).toEqual(LATN_DIGITS);
  expect(params.primaryGroupingSize).toEqual(3);

  // NOTE: hansfin not implemented, so falls back to 'latn'
  cache = getCache('zh');
  params = cache.getNumberParams('finance');
  expect(params.digits).toEqual(LATN_DIGITS);
  expect(params.primaryGroupingSize).toEqual(3);

  cache = getCache('fa-AF');
  params = cache.getNumberParams('finance');
  expect(params.digits).toEqual(
    ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']);
  expect(params.primaryGroupingSize).toEqual(3);

  params = cache.getNumberParams('mathbold');
  expect(params.digits).toEqual(
    ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗']);

  params = cache.getNumberParams('brah');
  expect(params.digits).toEqual(
    ['𑁦', '𑁧', '𑁨', '𑁩', '𑁪', '𑁫', '𑁬', '𑁭', '𑁮', '𑁯']);

  params = cache.getNumberParams('cakm');
  expect(params.digits).toEqual(
    ['𑄶', '𑄷', '𑄸', '𑄹', '𑄺', '𑄻', '𑄼', '𑄽', '𑄾', '𑄿']);

  params = cache.getNumberParams('osma');
  expect(params.digits).toEqual(
    ['𐒠', '𐒡', '𐒢', '𐒣', '𐒤', '𐒥', '𐒦', '𐒧', '𐒨', '𐒩']);
});
