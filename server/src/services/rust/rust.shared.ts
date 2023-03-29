// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Rust, RustData, RustPatch, RustQuery, RustService } from './rust.class'

export type { Rust, RustData, RustPatch, RustQuery }

export type RustClientService = Pick<RustService<Params<RustQuery>>, (typeof rustMethods)[number]>

export const rustPath = 'rust'

export const rustMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const rustClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(rustPath, connection.service(rustPath), {
    methods: rustMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [rustPath]: RustClientService
  }
}
