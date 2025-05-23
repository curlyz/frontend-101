/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { PokemonSpeciesSummary } from './PokemonSpeciesSummary.ts'

export type PokemonShapeDetail = {
  /**
   * @type integer
   */
  readonly id: number
  /**
   * @maxLength 200
   * @type string
   */
  name: string
  /**
   * @type array
   */
  readonly awesome_names: {
    /**
     * @type string
     */
    awesome_name: string
    /**
     * @type object
     */
    language: {
      /**
       * @type string
       */
      name: string
      /**
       * @type string, uri
       */
      url: string
    }
  }[]
  /**
   * @type array
   */
  readonly names: {
    /**
     * @type string, uri
     */
    url: string
    /**
     * @type string
     */
    name: string
  }[]
  /**
   * @type array
   */
  readonly pokemon_species: PokemonSpeciesSummary[]
}