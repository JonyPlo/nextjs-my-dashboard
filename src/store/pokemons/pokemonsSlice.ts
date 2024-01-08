import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon'

export interface PokemonsState {
  favorites: { [key: string]: SimplePokemon } // De esta forma se crea el tipado para una propiedad computada
}

const getInitialState = (): PokemonsState => {
  const favorites = JSON.parse(
    localStorage.getItem('favorite-pokemons') ?? '{}'
  )

  return favorites
}

const initialState: PokemonsState = {
  favorites: {},
}

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    onToggleFavorite: (state, { payload }: PayloadAction<SimplePokemon>) => {
      const { id } = payload

      if (state.favorites[id]) {
        delete state.favorites[id]
        return
      }

      state.favorites[id] = payload
    },

    setFavoritePokemons: (
      state,
      { payload }: PayloadAction<{ [key: string]: SimplePokemon }>
    ) => {
      state.favorites = payload
    },
  },
})

export const { onToggleFavorite, setFavoritePokemons } = pokemonsSlice.actions

export default pokemonsSlice.reducer
