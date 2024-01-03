//! En el nombre de la carpeta se agregan los corchetes como  [id] para indicar que esta parte de la ruta es un parametro, por lo tanto es dinamico y va a ir cambiando

import { Pokemon } from '@/pokemons'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

// De esta forma se crea un dynamic metadata o metadata dinámica, y tiene que tener exactamente el nombre "generateMetadata", ya que solo con ese nombre Next reconoce que es una funcion para aplicar a la metadata de la pagina, esta funcion recibe como argumento los parametros de la url y para que se apliquen en la metadata la funcion tiene que retornar un objeto con las propiedades de la metadata
// Recordar que si el nombre de la funcion esta mal escrito entonces no se aplicaran los cambios en la metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, name } = await getPokemon(params.id)

  // Capitalizo el nombre
  const capitalizedName = name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  try {
    return {
      title: `#${id} - ${capitalizedName}`,
      description: `Pokemon page ${capitalizedName}`,
    }
  } catch (error) {
    return {
      title: `Pokemon title`,
      description: `Pokemon description`,
    }
  }
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: 'force-cache',
    }).then((res) => res.json())

    return pokemon
  } catch (error) {
    // Este metodo de Next nos redirige a la pagina not-found.tsx global que configuramos en en root de la aplicacion, en este caso se encuentra en la ruta "src/app/not-found.tsx/" eso sirve para renderizar esa pagina por si algo falla en la peticion
    notFound()
  }
}

// Por defecto next ya hace que la pagina reciba el parametro id que asi es como nombramos a la carpeta que contiene esta pagina, y ese id tiene el valor o el id que mandamos en la url
// Este objeto props trae por defecto 2 propiedades, una se llama "params" que ahi es donde se almacena el o los parametros y la otra se llama "searchParams" que ahi se almacenaran los query params, por ejemplo del siguiente link "https://pokeapi.co/api/v2/pokemon/150?q=char&age=33" va a extraer el "q" y el "age" y terminara quedando searchParams = {q: 'char', age= '33'}
export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id)

  return (
    <div className='flex mt-5 flex-col items-center text-slate-800'>
      <div className='relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3'>
        <div className='mt-2 mb-8 w-full'>
          <h1 className='px-2 text-xl font-bold text-slate-700 capitalize'>
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className='flex flex-col justify-center items-center'>
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className='mb-5 w-5/12 h-auto'
            />

            <div className='flex flex-wrap'>
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className='mr-2 capitalize'>
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 px-2 w-full'>
          <div className='flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg '>
            <p className='text-sm text-gray-600'>Types</p>
            <div className='text-base font-medium text-navy-700 flex'>
              {pokemon.types.map((type) => (
                <p key={type.slot} className='mr-2 capitalize'>
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg '>
            <p className='text-sm text-gray-600'>Peso</p>
            <span className='text-base font-medium text-navy-700 flex'>
              {pokemon.weight}
            </span>
          </div>

          <div className='flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg'>
            <p className='text-sm text-gray-600'>Regular Sprites</p>
            <div className='flex justify-center'>
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                className='w-full'
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                className='w-full'
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className='flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg'>
            <p className='text-sm text-gray-600'>Shiny Sprites</p>
            <div className='flex justify-center'>
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                className='w-full'
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                className='w-full'
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
