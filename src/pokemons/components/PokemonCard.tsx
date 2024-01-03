import Link from 'next/link'
import { SimplePokemon } from '..'
import Image from 'next/image'
import { IoHeartOutline } from 'react-icons/io5'

interface Props {
  pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon

  return (
    <div className='mx-auto right-0 mt-2 w-60'>
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
              href={`/dashboard/pokemon/${id}`}
              className='border rounded-full py-2 px-4 text-xs font-semibold text-gray-100'
            >
              More Information
            </Link>
          </div>
        </div>
        <div className='border-b'>
          <Link
            href='/dashboard/main'
            className='px-4 py-2 hover:bg-gray-100 flex'
          >
            <div className='text-red-600 flex items-center'>
              <IoHeartOutline />
            </div>
            <div className='pl-3'>
              <p className='text-sm font-medium text-gray-800 leading-none'>
                No favorite
              </p>
              <p className='text-xs text-gray-500'>Mark as favorite</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
