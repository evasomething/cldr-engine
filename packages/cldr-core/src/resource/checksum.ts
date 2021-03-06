import { KeyIndexMap } from '@phensley/cldr-types';
import { Checksum } from '@phensley/cldr-utils';

/**
 * Compute a checksum on a KeyIndexMap used to configure the
 * schema. This lets us quickly confirm that the resource pack
 * was generated from the config at runtime
 *
 * @internal
 */
export const checksumIndices = (version: string, map: KeyIndexMap): string => {
  const c = new Checksum();
  // Checksum will ignore the patch level of the version, indicating that packs from any
  // patch level will work together.
  const v = version.split('.').slice(0, 2).join('.');
  c.update(v);

  // Visit map keys in sorted order
  const keys = Object.keys(map).sort();
  for (const key of keys) {
    c.update(key);

    // Mapped values must be visited in their existing order.
    for (const val of map[key].keys) {
      c.update(val);
    }
  }
  return c.get().toString(16);
};
