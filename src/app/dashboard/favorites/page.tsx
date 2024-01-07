import { FavoritePokemonGrid } from '@/pokemons'

export const metadata = {
  title: 'Favorites Page',
  description: 'Favorites Page',
}

export default function PokemonsPage() {
  return (
    <>
      <span className='text-5xl my-2'>
        Favorite Pokemons <small className='text-blue-500'>Global State</small>
      </span>

      <FavoritePokemonGrid />
    </>
  )
}
