//! En el nombre de la carpeta se agregan los corchetes como  [id] para indicar que esta parte de la ruta es un parametro, por lo tanto es dinamico y va a ir cambiando

import { Pokemon } from '@/pokemons'

interface Props {
  params: { id: string }
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: 'force-cache',
  }).then((res) => res.json())

  console.log('Se cargo: ', pokemon)

  return pokemon
}

// Por defecto next ya hace que la pagina reciba el parametro id que asi es como nombramos a la carpeta que contiene esta pagina, y ese id tiene el valor o el id que mandamos en la url
// Este objeto props trae por defecto 2 propiedades, una se llama "params" que ahi es donde se almacena el o los parametros y la otra se llama "searchParams" que ahi se almacenaran los query params, por ejemplo del siguiente link "https://pokeapi.co/api/v2/pokemon/150?q=char&age=33" va a extraer el "q" y el "age" y terminara quedando searchParams = {q: 'char', age= '33'}
export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id)

  return (
    <div>
      <h1>Pokemon {params.id}</h1>
      <div>{JSON.stringify(pokemon)}</div>
    </div>
  )
}
