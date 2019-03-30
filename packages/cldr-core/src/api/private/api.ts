import { Bundle } from '../../resource';
import { Internals } from '../../internals';
import { NumberSystemType } from '../../common';
import { ContextTransformInfo, NumberParams } from '../../common/private';
import { NumberParamsCache } from './numbers/params';

/**
 * Private API only visible internally.
 */
export class PrivateApiImpl {

  private numberParamsCache: NumberParamsCache;
  private contextTransforms: ContextTransformInfo;

  constructor(
    protected bundle: Bundle,
    protected internals: Internals
  ) {
    this.numberParamsCache = new NumberParamsCache(bundle, internals);
    this.contextTransforms =
      this.internals.schema.ContextTransforms.contextTransforms.mapping(this.bundle);
 }

  getNumberParams(numberSystem?: NumberSystemType, defaultSystem?: NumberSystemType): NumberParams {
    return this.numberParamsCache.getNumberParams(numberSystem, defaultSystem);
  }

  getContextTransformInfo(): ContextTransformInfo {
    return this.contextTransforms;
  }
}
