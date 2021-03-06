import { Decimal, DecimalConstants, MathContext } from '../src';

const parse = (s: string) => new Decimal(s);
const div = (u: string, v: string, c?: MathContext) => parse(u).divide(parse(v), c);
const divmod = (u: string, v: string) => parse(u).divmod(parse(v));

test('divide default', () => {
  expect(div('0', '5')).toEqual(parse('0'));
  expect(div('15', '1')).toEqual(parse('15'));
  expect(div('99999', '10')).toEqual(parse('9999.9'));
  expect(div('99899999001', '999')).toEqual(parse('99999999'));
  expect(div('99799999002', '998')).toEqual(parse('99999999'));

  expect(div('10000000000', '99000000')).toEqual(parse('101.010101010101010101010101'));

  expect(div('99899999001', '1199999999')).toEqual(parse('83.24999923687499936406249947'));

  expect(div('9999999999999', '55555555555')).toEqual(parse('180.00000000178200000001782'));

  expect(div('9999999999999999999999', '9999999999999999999')).toEqual(parse('1000.0000000000000000999'));
});

test('divide negative', () => {
  expect(div('503', '-10')).toEqual(parse('-50.3'));
  expect(div('-503', '100')).toEqual(parse('-5.03'));
});

test('divide near radix', () => {
  expect(div('10000000', '99999999999999')).toEqual(parse('1.00000000000001E-7'));
});

test('D3 coverage', () => {
  expect(div('1000000000', '1000112808')).toEqual(parse('0.9998872047242094713779527959'));
});

test('divide half even', () => {
  const halfEven = (precision: number): MathContext => ({ precision, round: 'half-even' });

  expect(div('12', '3', halfEven(0))).toEqual(parse('0e1'));
  expect(div('12', '3', halfEven(1))).toEqual(parse('4'));
  expect(div('12', '3', halfEven(10))).toEqual(parse('4'));

  expect(div('3', '10', halfEven(0))).toEqual(parse('0'));
  expect(div('3', '10', halfEven(1))).toEqual(parse('0.3'));
  expect(div('3', '10', halfEven(10))).toEqual(parse('.3'));

  expect(div('99999', '10', halfEven(5))).toEqual(parse('9999.9'));
  expect(div('99999', '10', halfEven(10))).toEqual(parse('9999.9'));
});

test('divide decrements qhat', () => {
  // Cases that cause qhat to be decremented in D3
  expect(div('96441598043416655685', '13367828761276')).toEqual(parse('7214454.92500541360919505766'));

  expect(div('35314321308673059375', '16403941393069')).toEqual(parse('2152794.896206717783118193836'));

  expect(div('506806006102288', '46464220541015929')).toEqual(parse('0.0109074466374596544269297722'));
});

test('divide add back', () => {
  // Cases that cause D6 to be executed.
  expect(div('88888888888888888888888888888888888', '17721038931014481')).toEqual(
    parse('5016008893999999985.897828785'),
  );

  expect(div('444444444444444444444', '17721038931014482')).toEqual(parse('25080.04446999999851419464499'));

  expect(div('15555555555555555555555555', '77777777777777814')).toEqual(parse('199999999.99999990685714285'));

  expect(div('199999999999', '77777777777784000')).toEqual(parse('0.000002571428571415508571428572474'));

  expect(div('888888888888888888888888888888888888888', '33333333000000420')).toEqual(
    parse('26666666933332999999993.30667'),
  );

  expect(div('66666666666666666666666666', '69969109701080089')).toEqual(parse('952801414.1022799999999192286'));
});

test('divide by zero', () => {
  expect(div('123', '0')).toEqual(DecimalConstants.POSITIVE_INFINITY);
  expect(div('123', '0.0000e4')).toEqual(DecimalConstants.POSITIVE_INFINITY);

  expect(div('-123', '0')).toEqual(DecimalConstants.NEGATIVE_INFINITY);
  expect(div('-123', '0.0000e4')).toEqual(DecimalConstants.NEGATIVE_INFINITY);

  expect(div('0', '0')).toEqual(DecimalConstants.NAN);
});

test('divide zero', () => {
  expect(div('0', '3')).toEqual(parse('0'));
  expect(div('0', '3', { precision: 10 })).toEqual(parse('0'));
  expect(div('0', '3', { scale: 10 })).toEqual(parse('0.0000000000'));
});

test('divide by one', () => {
  expect(div('1', '1')).toEqual(parse('1'));
  expect(div('3', '1')).toEqual(parse('3'));
  expect(div('10', '1')).toEqual(parse('1e1'));
  expect(div('10', '1', { scale: 2 })).toEqual(parse('10.00'));
  expect(div('10', '1', { scale: 10 })).toEqual(parse('10.0000000000'));
});

test('divide small with large', () => {
  expect(div('1e-100', '1e50')).toEqual(parse('1e-150'));
  expect(div('1e-100', '3e50', { precision: 10 })).toEqual(parse('3.333333333e-151'));
  expect(div('3e-20', '2e20')).toEqual(parse('15e-41'));
});

test('divide with precision', () => {
  expect(div('10', '3', { precision: 0 })).toEqual(parse('0e1'));
  expect(div('10', '3', { precision: 1 })).toEqual(parse('3'));
  expect(div('10', '3', { precision: 2 })).toEqual(parse('3.3'));
  expect(div('10', '3', { precision: 3 })).toEqual(parse('3.33'));
  expect(div('10', '3', { precision: 4 })).toEqual(parse('3.333'));
  expect(div('10', '3', { precision: 5 })).toEqual(parse('3.3333'));
  expect(div('10', '3', { precision: 10 })).toEqual(parse('3.333333333'));
  expect(div('10', '3', { precision: 20 })).toEqual(parse('3.3333333333333333333'));

  expect(div('2', '3', { precision: 0 })).toEqual(parse('1'));
  expect(div('2', '3', { precision: 1 })).toEqual(parse('0.7'));
  expect(div('2', '3', { precision: 2 })).toEqual(parse('0.67'));
  expect(div('2', '3', { precision: 3 })).toEqual(parse('0.667'));
  expect(div('2', '3', { precision: 4 })).toEqual(parse('0.6667'));
  expect(div('2', '3', { precision: 5 })).toEqual(parse('0.66667'));
  expect(div('2', '3', { precision: 10 })).toEqual(parse('0.6666666667'));
  expect(div('2', '3', { precision: 20 })).toEqual(parse('0.66666666666666666667'));
  expect(div('2', '3', { precision: 30 })).toEqual(parse('0.666666666666666666666666666667'));

  expect(div('10', '6', { precision: 0 })).toEqual(parse('0e1'));
  expect(div('10', '6', { precision: 1 })).toEqual(parse('2'));
  expect(div('10', '6', { precision: 2 })).toEqual(parse('1.7'));
  expect(div('10', '6', { precision: 3 })).toEqual(parse('1.67'));
  expect(div('10', '6', { precision: 4 })).toEqual(parse('1.667'));
  expect(div('10', '6', { precision: 5 })).toEqual(parse('1.6667'));
  expect(div('10', '6', { precision: 10 })).toEqual(parse('1.666666667'));
  expect(div('10', '6', { precision: 20 })).toEqual(parse('1.6666666666666666667'));
  expect(div('10', '6', { precision: 30 })).toEqual(parse('1.66666666666666666666666666667'));

  expect(div('10000', '6', { precision: 0 })).toEqual(parse('0e4'));
  expect(div('10000', '6', { precision: 1 })).toEqual(parse('2e3'));
  expect(div('10000', '6', { precision: 2 })).toEqual(parse('17e2'));
  expect(div('10000', '6', { precision: 3 })).toEqual(parse('167e1'));
  expect(div('10000', '6', { precision: 4 })).toEqual(parse('1667'));
  expect(div('10000', '6', { precision: 5 })).toEqual(parse('1666.7'));
  expect(div('10000', '6', { precision: 6 })).toEqual(parse('1666.67'));
  expect(div('10000', '6', { precision: 7 })).toEqual(parse('1666.667'));
  expect(div('10000', '6', { precision: 8 })).toEqual(parse('1666.6667'));
  expect(div('10000', '6', { precision: 9 })).toEqual(parse('1666.66667'));
  expect(div('10000', '6', { precision: 10 })).toEqual(parse('1666.666667'));

  // Default precision 28
  expect(div('1101600.00', '3.141592653589793238462643383')).toEqual(parse('350650.1706200638037660047075'));

  expect(div('1101600.00', '3.141592653589793238462643383', { precision: 30 })).toEqual(
    parse('350650.170620063803766004707494'),
  );
});

test('divide with scale', () => {
  expect(div('10', '3', { scale: -2 })).toEqual(parse('0e2'));
  expect(div('10', '3', { scale: -1 })).toEqual(parse('0e1'));
  expect(div('10', '3', { scale: 0 })).toEqual(parse('3'));
  expect(div('10', '3', { scale: 1 })).toEqual(parse('3.3'));
  expect(div('10', '3', { scale: 2 })).toEqual(parse('3.33'));
  expect(div('10', '3', { scale: 3 })).toEqual(parse('3.333'));
  expect(div('10', '3', { scale: 4 })).toEqual(parse('3.3333'));
  expect(div('10', '3', { scale: 5 })).toEqual(parse('3.33333'));
  expect(div('10', '3', { scale: 10 })).toEqual(parse('3.3333333333'));
  expect(div('10', '3', { scale: 20 })).toEqual(parse('3.33333333333333333333'));

  expect(div('10', '6', { scale: -2 })).toEqual(parse('0e2'));
  expect(div('10', '6', { scale: -1 })).toEqual(parse('0e1'));
  expect(div('10', '6', { scale: 0 })).toEqual(parse('2'));
  expect(div('10', '6', { scale: 1 })).toEqual(parse('1.7'));
  expect(div('10', '6', { scale: 2 })).toEqual(parse('1.67'));
  expect(div('10', '6', { scale: 3 })).toEqual(parse('1.667'));
  expect(div('10', '6', { scale: 4 })).toEqual(parse('1.6667'));
  expect(div('10', '6', { scale: 5 })).toEqual(parse('1.66667'));
  expect(div('10', '6', { scale: 10 })).toEqual(parse('1.6666666667'));
  expect(div('10', '6', { scale: 20 })).toEqual(parse('1.66666666666666666667'));

  expect(div('10000', '6', { scale: -4 })).toEqual(parse('0e4'));
  expect(div('10000', '6', { scale: -3 })).toEqual(parse('2e3'));
  expect(div('10000', '6', { scale: -2 })).toEqual(parse('17e2'));
  expect(div('10000', '6', { scale: -1 })).toEqual(parse('167e1'));
  expect(div('10000', '6', { scale: 0 })).toEqual(parse('1667'));
  expect(div('10000', '6', { scale: 1 })).toEqual(parse('1666.7'));
  expect(div('10000', '6', { scale: 2 })).toEqual(parse('1666.67'));
  expect(div('10000', '6', { scale: 3 })).toEqual(parse('1666.667'));
  expect(div('10000', '6', { scale: 4 })).toEqual(parse('1666.6667'));
  expect(div('10000', '6', { scale: 5 })).toEqual(parse('1666.66667'));
  expect(div('10000', '6', { scale: 6 })).toEqual(parse('1666.666667'));

  expect(div('1101600.00', '3.141592653589793238462643383', { scale: 30 })).toEqual(
    parse('350650.170620063803766004707493520473'),
  );

  expect(div('1207008', '647386433361211', { scale: 5 })).toEqual(parse('0.00000'));
  expect(div('1207008', '647386433361211', { scale: 8 })).toEqual(parse('0.00000000'));
  expect(div('1207008', '647386433361211', { scale: 9 })).toEqual(parse('0.000000002'));
  expect(div('1207008', '647386433361211', { scale: 10 })).toEqual(parse('0.0000000019'));
  expect(div('1207008', '647386433361211', { scale: 11 })).toEqual(parse('0.00000000186'));
  expect(div('1207008', '647386433361211', { scale: 12 })).toEqual(parse('0.000000001864'));
});

test('divide by single digit', () => {
  expect(div('982.0065714814661859824253792', '1', { scale: 11 })).toEqual(parse('982.00657148147'));
  expect(div('982.0065714814661859824253792', '1', { scale: 10 })).toEqual(parse('982.0065714815'));
  expect(div('982.0065714814661859824253792', '1', { scale: 9 })).toEqual(parse('982.006571481'));
  expect(div('982.0065714814661859824253792', '1', { scale: 8 })).toEqual(parse('982.00657148'));
  expect(div('982.0065714814661859824253792', '1', { scale: 7 })).toEqual(parse('982.0065715'));
  expect(div('982.0065714814661859824253792', '1', { scale: 6 })).toEqual(parse('982.006571'));
  expect(div('982.0065714814661859824253792', '1', { scale: 5 })).toEqual(parse('982.00657'));
  expect(div('982.0065714814661859824253792', '1', { scale: 4 })).toEqual(parse('982.0066'));
  expect(div('982.0065714814661859824253792', '1', { scale: 3 })).toEqual(parse('982.007'));
  expect(div('982.0065714814661859824253792', '1', { scale: 2 })).toEqual(parse('982.01'));
  expect(div('982.0065714814661859824253792', '1', { scale: 1 })).toEqual(parse('982.0'));
  expect(div('982.0065714814661859824253792', '1', { scale: 0 })).toEqual(parse('982'));

  expect(div('982.0065714814661859824253792', '2', { scale: 10 })).toEqual(parse('491.0032857407'));
  expect(div('982.0065714814661859824253792', '2', { scale: 9 })).toEqual(parse('491.003285741'));
  expect(div('982.0065714814661859824253792', '2', { scale: 8 })).toEqual(parse('491.00328574'));
  expect(div('982.0065714814661859824253792', '2', { scale: 7 })).toEqual(parse('491.0032857'));
  expect(div('982.0065714814661859824253792', '2', { scale: 6 })).toEqual(parse('491.003286'));
  expect(div('982.0065714814661859824253792', '2', { scale: 5 })).toEqual(parse('491.00329'));
  expect(div('982.0065714814661859824253792', '2', { scale: 4 })).toEqual(parse('491.0033'));
  expect(div('982.0065714814661859824253792', '2', { scale: 3 })).toEqual(parse('491.003'));
  expect(div('982.0065714814661859824253792', '2', { scale: 2 })).toEqual(parse('491.00'));
  expect(div('982.0065714814661859824253792', '2', { scale: 1 })).toEqual(parse('491.0'));
  expect(div('982.0065714814661859824253792', '2', { scale: 0 })).toEqual(parse('491'));

  expect(div('982.0065714814661859824253792', '3', { scale: 11 })).toEqual(parse('327.33552382716'));
  expect(div('982.0065714814661859824253792', '3', { scale: 10 })).toEqual(parse('327.3355238272'));
  expect(div('982.0065714814661859824253792', '3', { scale: 9 })).toEqual(parse('327.335523827'));
  expect(div('982.0065714814661859824253792', '3', { scale: 8 })).toEqual(parse('327.33552383'));
  expect(div('982.0065714814661859824253792', '3', { scale: 7 })).toEqual(parse('327.3355238'));
  expect(div('982.0065714814661859824253792', '3', { scale: 6 })).toEqual(parse('327.335524'));
  expect(div('982.0065714814661859824253792', '3', { scale: 5 })).toEqual(parse('327.33552'));
  expect(div('982.0065714814661859824253792', '3', { scale: 4 })).toEqual(parse('327.3355'));
  expect(div('982.0065714814661859824253792', '3', { scale: 3 })).toEqual(parse('327.336'));
  expect(div('982.0065714814661859824253792', '3', { scale: 2 })).toEqual(parse('327.34'));
  expect(div('982.0065714814661859824253792', '3', { scale: 1 })).toEqual(parse('327.3'));
  expect(div('982.0065714814661859824253792', '3', { scale: 0 })).toEqual(parse('327'));

  expect(div('982.0065714814661859824253792', '4', { scale: 11 })).toEqual(parse('245.50164287037'));
  expect(div('982.0065714814661859824253792', '4', { scale: 10 })).toEqual(parse('245.5016428704'));
  expect(div('982.0065714814661859824253792', '4', { scale: 9 })).toEqual(parse('245.501642870'));
  expect(div('982.0065714814661859824253792', '4', { scale: 8 })).toEqual(parse('245.50164287'));
  expect(div('982.0065714814661859824253792', '4', { scale: 7 })).toEqual(parse('245.5016429'));
  expect(div('982.0065714814661859824253792', '4', { scale: 6 })).toEqual(parse('245.501643'));
  expect(div('982.0065714814661859824253792', '4', { scale: 5 })).toEqual(parse('245.50164'));
  expect(div('982.0065714814661859824253792', '4', { scale: 4 })).toEqual(parse('245.5016'));
  expect(div('982.0065714814661859824253792', '4', { scale: 3 })).toEqual(parse('245.502'));
  expect(div('982.0065714814661859824253792', '4', { scale: 2 })).toEqual(parse('245.50'));
  expect(div('982.0065714814661859824253792', '4', { scale: 1 })).toEqual(parse('245.5'));
  expect(div('982.0065714814661859824253792', '4', { scale: 0 })).toEqual(parse('246'));
});

test('divmod', () => {
  expect(divmod('10', '0')).toEqual([DecimalConstants.POSITIVE_INFINITY, DecimalConstants.NAN]);

  expect(divmod('0', '10')).toEqual([parse('0'), parse('0')]);
  expect(divmod('2', '3')).toEqual([parse('0'), parse('2')]);
  expect(divmod('10', '6')).toEqual([parse('1'), parse('4')]);

  expect(divmod('10', '3')).toEqual([parse('3'), parse('1')]);
  expect(divmod('-10', '3')).toEqual([parse('-3'), parse('-1')]);
  expect(divmod('10', '-3')).toEqual([parse('-3'), parse('1')]);
  expect(divmod('-10', '-3')).toEqual([parse('3'), parse('-1')]);

  expect(divmod('10', '.03')).toEqual([parse('333'), parse('.01')]);
  expect(divmod('10e1', '.03')).toEqual([parse('3333'), parse('.01')]);
  expect(divmod('10e2', '.03')).toEqual([parse('33333'), parse('.01')]);

  expect(divmod('10', '.06')).toEqual([parse('166'), parse('.04')]);
  expect(divmod('10e1', '.06')).toEqual([parse('1666'), parse('.04')]);
  expect(divmod('10e2', '.06')).toEqual([parse('16666'), parse('.04')]);

  expect(divmod('12345.0000000000', '12')).toEqual([parse('1028'), parse('9.0000000000')]);
  expect(divmod('12.0000000000000', '12')).toEqual([parse('1'), parse('0.0000000000000')]);
  expect(divmod('12', '3.0000000000000')).toEqual([parse('4'), parse('0.0000000000000')]);

  expect(divmod('96441598043416655685', '13367828761276')).toEqual([parse('7214454'), parse('12365313972381')]);

  expect(divmod('0', '12345')).toEqual([parse('0'), parse('0')]);
  expect(divmod('1.1', '12345')).toEqual([parse('0'), parse('1.1')]);
  expect(divmod('3.14159', '143')).toEqual([parse('0'), parse('3.14159')]);
  expect(divmod('300000000.14159', '1484930')).toEqual([parse('202'), parse('44140.14159')]);
});

const DAY = new Decimal(86400);
const HOUR = new Decimal(3600);
const MINUTE = new Decimal(60);

test('divmod conversions', () => {
  const timestamp = new Decimal(1468800 + 46800 + 2520 + 23);
  const [days, t2] = timestamp.divmod(DAY);
  const [hours, t3] = t2.divmod(HOUR);
  const [minutes, seconds] = t3.divmod(MINUTE);

  expect(days).toEqual(parse('17'));
  expect(hours).toEqual(parse('13'));
  expect(minutes).toEqual(parse('42'));
  expect(seconds).toEqual(parse('23'));
});

test('divmod shift', () => {
  expect(divmod('2e-2', '1.00000005')).toEqual([parse('0'), parse('2000000e-8')]);
});

test('mod', () => {
  expect(parse('0').mod(parse('1'))).toEqual(parse('0'));

  expect(parse('99').mod(parse('9'))).toEqual(parse('0'));
  expect(parse('100').mod(parse('9'))).toEqual(parse('1'));

  expect(parse('122').mod(parse('3'))).toEqual(parse('2'));
  expect(parse('123').mod(parse('3'))).toEqual(parse('0'));
  expect(parse('124').mod(parse('3'))).toEqual(parse('1'));

  expect(parse('122').mod(parse('4'))).toEqual(parse('2'));
  expect(parse('123').mod(parse('4'))).toEqual(parse('3'));
  expect(parse('124').mod(parse('4'))).toEqual(parse('0'));

  expect(parse('123.456').mod(parse('10'))).toEqual(parse('3.456'));
  expect(parse('990.987').mod(parse('10'))).toEqual(parse('0.987'));
});
