/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { PaginatedPokemonSummaryList } from '../PaginatedPokemonSummaryList.ts'

export type PokemonListQueryParams = {
  /**
   * @description Number of results to return per page.
   * @type integer | undefined
   */
  limit?: number | undefined
  /**
   * @description The initial index from which to return the results.
   * @type integer | undefined
   */
  offset?: number | undefined
  /**
   * @description > Only available locally and not at [pokeapi.co](https://pokeapi.co/docs/v2)\nCase-insensitive query applied on the `name` property.
   * @type string | undefined
   */
  q?: string | undefined
}

export type PokemonList200 = PaginatedPokemonSummaryList

export type PokemonListQueryResponse = PokemonList200

export type PokemonListQuery = {
  Response: PokemonList200
  QueryParams: PokemonListQueryParams
  Errors: any
}