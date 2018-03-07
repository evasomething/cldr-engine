import { REGION } from './languagetag';
import { territoryAliasRaw } from './autogen.aliases';

export type FastTag = (string | number)[];
export type FastTagPair = { type: FastTag, repl: FastTag };
export type LanguageAliasMap = { [x: string]: FastTagPair[] };
export type TerritoryAliasMap = { [x: string]: string[] };

const buildTerritoryAliasMap = (): TerritoryAliasMap => {
  return territoryAliasRaw.split('|').reduce((o: TerritoryAliasMap, e) => {
    const [k, v] = e.split(':');
    const regions = v.split(/\s+/g);
    o[k] = regions;
    return o;
  }, {});
};

const TERRITORY_ALIAS_MAP: TerritoryAliasMap = buildTerritoryAliasMap();

/**
 * Helper for the language tag parser to fix overlong region fields that may
 * or may not be variants.
 */
export const replaceRegion = (region: string): string | undefined => {
  const aliases = TERRITORY_ALIAS_MAP[region];
  return aliases === undefined ? undefined : aliases[0];
};

/**
 * Substitute territory subtag aliases, if any.
 */
export const substituteRegionAliases = (dst: FastTag): void => {
  const region = dst[REGION];
  const replacement = region === REGION ? undefined : TERRITORY_ALIAS_MAP[region];
  if (replacement === undefined) {
    return;
  }

  // Hack: for now we just use the first region in the list.
  dst[REGION] = replacement[0];

  // TODO: get the best regions for this language / script combiantion, and if
  // one is found in the replacement set, use it. Otherwise use the first in the list.
};
