import * as fs from 'fs';
import { join } from 'path';
import * as zlib from 'zlib';

import { config as defaultconfig } from '../../../cldr/src/config';
import { CLDRFramework, CLDROptions } from '../../src';

const packPath = (language: string) =>
  join(__dirname, '..', '..', '..', 'cldr', 'packs', `${language}.json.gz`);

export const loader = (language: string): any => {
  const path = packPath(language);
  const compressed = fs.readFileSync(path);
  return zlib.gunzipSync(compressed).toString('utf-8');
};

export const asyncLoader = (language: string): Promise<any> => {
  const path = packPath(language);
  return new Promise<any>((resolve, reject) => {
    fs.readFile(path, {}, (err, data) => {
      if (err) {
        return reject(String(err));
      }
      zlib.gunzip(data, (err2, result) => {
        if (err2) {
          return reject(String(err2));
        }
        return resolve(result.toString('utf-8'));
      });
    });
  });
};

const defaultOptions: CLDROptions = {
  config: defaultconfig,
  debug: true,
  loader,
  asyncLoader,
  packCacheSize: 3,
  patternCacheSize: 50
};

type OptKey = keyof CLDROptions;

export const getCLDR = (options: CLDROptions = defaultOptions): CLDRFramework => {
  const merged: CLDROptions = { config: defaultconfig };
  const keys: OptKey[] = Object.keys(defaultOptions) as OptKey[];
  for (const key of keys) {
    const val = options[key];
    merged[key] = val === undefined ? defaultOptions[key] : val;
  }
  return new CLDRFramework(merged);
};