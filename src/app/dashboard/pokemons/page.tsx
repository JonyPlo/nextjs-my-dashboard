import { PokemonGrid, PokemonsResponse, SimplePokemon } from '@/pokemons'


export const metadata = {
 title: 'Pokemons Page',
 description: 'Pokemons Page',
};

// El equipo de Next modifico el metodo fetch de javascript con algunas funcionalidades extras como por ejemplo almacenar la respuesta en cache, poner un contador para poder realizar una peticion nuevamente, etc. Por defecto haciendo una consulta normal ya almacena los datos en cache
const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json())

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }))

  return pokemons
}


export default async function PokemonsPage() {
  const pokemons = await getPokemons(151)

  return (
    <div className='flex flex-col'>
      <span className='text-5xl my-2'>
        Pokemons List <small className='text-blue-500'>Static</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  )
}
