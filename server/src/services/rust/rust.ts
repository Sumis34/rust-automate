// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  rustDataValidator,
  rustPatchValidator,
  rustQueryValidator,
  rustResolver,
  rustExternalResolver,
  rustDataResolver,
  rustPatchResolver,
  rustQueryResolver
} from './rust.schema'

import type { Application } from '../../declarations'
import { RustService, getOptions } from './rust.class'
import { rustPath, rustMethods } from './rust.shared'
import { logRuntime } from '../../hooks/log-runtime'

export * from './rust.class'
export * from './rust.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const rust = (app: Application) => {
  // Register our service on the Feathers application
  app.use(rustPath, new RustService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: rustMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(rustPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(rustExternalResolver),
        schemaHooks.resolveResult(rustResolver),
        logRuntime
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(rustQueryValidator), schemaHooks.resolveQuery(rustQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(rustDataValidator), schemaHooks.resolveData(rustDataResolver)],
      patch: [schemaHooks.validateData(rustPatchValidator), schemaHooks.resolveData(rustPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [rustPath]: RustService
  }
}
