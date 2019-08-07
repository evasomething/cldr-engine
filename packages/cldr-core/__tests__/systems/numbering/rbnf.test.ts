import {
  AlgorithmicNumberingSystem,
  AlgorithmicNumberingSystems
} from '../../../src/systems/numbering/algorithmic';
import { Decimal } from '@phensley/decimal';
import { languageBundle } from '../../_helpers/bundle';

const SYMBOLS = {
  decimal: '.',
  nan: 'NaN',
  infinity: '∞'
};

test('numbering systems', () => {
  const en = languageBundle('en');
  const systems = new AlgorithmicNumberingSystems(en.spellout());
  let s: string;

  const sys = systems.system('romanlow', SYMBOLS)!;
  s = sys.format(new Decimal('1234'));
  expect(s).toEqual('mccxxxiv');

  s = sys.format(new Decimal('57'));
  expect(s).toEqual('lvii');
});

test('spellout english', () => {
  const en = languageBundle('en');
  let systems: AlgorithmicNumberingSystems;
  let system: AlgorithmicNumberingSystem | undefined;
  let s: string;

  systems = new AlgorithmicNumberingSystems(en.spellout(), 'en-Latn');

  system = systems.rbnf('spellout-numbering', SYMBOLS)!;
  s = system.format(new Decimal('1234'));
  expect(s).toEqual('one thousand two hundred thirty-four');

  s = system.format(new Decimal('57'));
  expect(s).toEqual('fifty-seven');

  system = systems.rbnf('spellout-cardinal', SYMBOLS)!;
  s = system.format(new Decimal('1000273'));
  expect(s).toEqual('one million two hundred seventy-three');

  systems = new AlgorithmicNumberingSystems(en.spellout(), 'en-Latn-IN');
  system = systems.rbnf('spellout-cardinal', SYMBOLS)!;
  s = system.format(new Decimal('1000273'));
  expect(s).toEqual('ten lakh two hundred seventy-three');
});
