//! En el nombre de la carpeta se agregan los corchetes como  [id] para indicar que esta parte de la ruta es un parametro, por lo tanto es dinamico y va a ir cambiando

import { Pokemon } from '@/pokemons'
import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

// De esta forma se crea un dynamic metadata o metadata dinámica, y tiene que tener exactamente el nombre "generateMetadata", ya que solo con ese nombre Next reconoce que es una funcion para aplicar a la metadata de la pagina, esta funcion recibe como argumento los parametros de la url y para que se apliquen en la metadata la funcion tiene que retornar un objeto con las propiedades de la metadata
// Recordar que si el nombre de la funcion esta mal escrito entonces no se aplicaran los cambios en la metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let { id, name } = await getPokemon(params.id)

  // Capitalizo el nombre
  name = name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `#${id} - ${name}`,
    description: `Pokemon page ${name}}`,
  }
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: 'force-cache',
  }).then((res) => res.json())

  console.log('Se cargo: ', pokemon.name)

  return pokemon
}

// Por defecto next ya hace que la pagina reciba el parametro id que asi es como nombramos a la carpeta que contiene esta pagina, y ese id tiene el valor o el id que mandamos en la url
// Este objeto props trae por defecto 2 propiedades, una se llama "params" que ahi es donde se almacena el o los parametros y la otra se llama "searchParams" que ahi se almacenaran los query params, por ejemplo del siguiente link "https://pokeapi.co/api/v2/pokemon/150?q=char&age=33" va a extraer el "q" y el "age" y terminara quedando searchParams = {q: 'char', age= '33'}
export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id)

  return (
    <div>
      <h1>Pokemon {params.id}</h1>
      <div>{pokemon.name}</div>
    </div>
  )
}
