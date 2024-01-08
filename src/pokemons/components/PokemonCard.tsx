'use client'

import Link from 'next/link'
import Image from 'next/image'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '@/store'
import { onToggleFavorite } from '@/store/pokemons/pokemonsSlice'
import { SimplePokemon } from '..'
import Swal from 'sweetalert2'

interface Props {
  pokemon: SimplePokemon
  favorites?: boolean
}

export const PokemonCard = ({ pokemon, favorites }: Props) => {
  const { id, name } = pokemon
  const isFavorite = useAppSelector((state) =>
    Boolean(state.pokemons.favorites[id])
  )
  const dispatch = useAppDispatch()

  const toggleFavorite = () => {
    // Condition if pokemon card is in favorites page
    if (favorites) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      })

      // Capitalize the name
      const capitalizedName = name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return Swal.fire({
        title: `Remove ${capitalizedName} pokemon from favorites?`,
        text: 'Then you will have to add it again from the pokemon page!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1e40af',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(onToggleFavorite(pokemon))
          Toast.fire({
            icon: 'success',
            title: `${capitalizedName} removed from favorites`,
          })
        }
      })
    }

    dispatch(onToggleFavorite(pokemon))
  }

  return (
    <div className='mt-2 w-full'>
      <div className='bg-white rounded overflow-hidden shadow-lg'>
        <div className='text-center p-6 bg-gray-800 border-b flex flex-col items-center'>
          <Image
            key={id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            width={0}
            height={0}
            className='w-auto h-40'
            alt={name}
          />
          <p className='pt-2 text-lg font-semibold text-gray-50 capitalize'>
            {name}
          </p>
          <div className='mt-5'>
            <Link
              href={`/dashboard/pokemon/${name}`}
              className='border rounded-full py-2 px-4 text-xs font-semibold text-gray-100'
            >
              More Information
            </Link>
          </div>
        </div>
        <div className='border-b'>
          <div
            className='px-4 py-2 hover:bg-gray-100 flex cursor-pointer'
            onClick={toggleFavorite}
          >
            <div className='text-red-600 flex items-center'>
              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </div>
            <div className='pl-3'>
              <p className='text-sm font-medium text-gray-800 leading-none'>
                {isFavorite
                  ? 'Is a favorite Pokemon'
                  : 'Not a favorite Pokemon'}
              </p>
              <p className='text-xs text-gray-500'>
                {isFavorite ? 'Remove as favorite' : 'Add as favorite'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
