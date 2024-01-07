import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon'

export interface PokemonsState {
  [key: string]: SimplePokemon // De esta forma se crea el tipado para una propiedad computada
}

const initialState: PokemonsState = {}

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    onToggleFavorite: (state, { payload }: PayloadAction<SimplePokemon>) => {
      const { id } = payload

      if (state[id]) {
        delete state[id]
        return
      }

      state[id] = payload
    },
  },
})

export const { onToggleFavorite } = pokemonsSlice.actions

export default pokemonsSlice.reducer
