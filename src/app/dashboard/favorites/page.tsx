import { PokemonGrid, PokemonsResponse, SimplePokemon } from '@/pokemons'


export const metadata = {
 title: 'Favorites Page',
 description: 'Favorites Page',
};



export default async function PokemonsPage() {

  return (
    <div className='flex flex-col'>
      <span className='text-5xl my-2'>
        Favorite Pokemons <small className='text-blue-500'>Global State</small>
      </span>

      <PokemonGrid pokemons={[]} />
    </div>
  )
}
