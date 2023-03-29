// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const rustSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Rust', additionalProperties: false }
)
export type Rust = Static<typeof rustSchema>
export const rustValidator = getValidator(rustSchema, dataValidator)
export const rustResolver = resolve<Rust, HookContext>({})

export const rustExternalResolver = resolve<Rust, HookContext>({})

// Schema for creating new entries
export const rustDataSchema = Type.Pick(rustSchema, ['text'], {
  $id: 'RustData'
})
export type RustData = Static<typeof rustDataSchema>
export const rustDataValidator = getValidator(rustDataSchema, dataValidator)
export const rustDataResolver = resolve<Rust, HookContext>({})

// Schema for updating existing entries
export const rustPatchSchema = Type.Partial(rustSchema, {
  $id: 'RustPatch'
})
export type RustPatch = Static<typeof rustPatchSchema>
export const rustPatchValidator = getValidator(rustPatchSchema, dataValidator)
export const rustPatchResolver = resolve<Rust, HookContext>({})

// Schema for allowed query properties
export const rustQueryProperties = Type.Pick(rustSchema, ['id', 'text'])
export const rustQuerySchema = Type.Intersect(
  [
    querySyntax(rustQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RustQuery = Static<typeof rustQuerySchema>
export const rustQueryValidator = getValidator(rustQuerySchema, queryValidator)
export const rustQueryResolver = resolve<RustQuery, HookContext>({})
