import { Action, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import { RootState } from '..'

export const localStorageMiddleware =
  (state: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    next(action)

    if (action.type === 'pokemons/onToggleFavorite') {
      const { pokemons } = state.getState() as RootState
      localStorage.setItem('favorite-pokemons', JSON.stringify(pokemons.favorites))
      return
    }
  }
