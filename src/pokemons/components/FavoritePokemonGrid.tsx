'use client'

import { useAppSelector } from '@/store'
import { PokemonCard } from '..'
import Link from 'next/link'
import { useState } from 'react'
import { IoHeartOutline } from 'react-icons/io5'

export const FavoritePokemonGrid = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons)
  )
  const [pokemons, setPokemons] = useState(favoritePokemons)

  return (
    <>
      {pokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </>
  )
}

export const NoFavorites = () => {
  return (
    <div className='h-screen flex flex-col justify-evenly'>
      <div className='grid place-items-center'>
        <IoHeartOutline size={100} className='text-red-500' />
        <p className='text-3xl text-center text-balance'>
          No pokemon have been added as favorites yet.
        </p>
      </div>
      <p className='text-3xl text-center text-balance mt-10'>
        Try to add someone{' '}
        <Link
          href={'/dashboard/pokemons'}
          className='text-blue-600 underline decoration-4'
        >
          here
        </Link>
      </p>
    </div>
  )
}
