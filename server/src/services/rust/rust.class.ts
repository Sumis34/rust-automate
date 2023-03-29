// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Rust, RustData, RustPatch, RustQuery } from './rust.schema'

export type { Rust, RustData, RustPatch, RustQuery }

export interface RustParams extends KnexAdapterParams<RustQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RustService<ServiceParams extends Params = RustParams> extends KnexService<
  Rust,
  RustData,
  RustParams,
  RustPatch
> {
  async find() {
    // Just return all our messages
    return 'hello'
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'rust'
  }
}
