'use client'

import { useAppSelector } from '@/store'
import { SimpleWidget } from '..'
import { IoCartOutline } from 'react-icons/io5'

export const WidgetsGrid = () => {
  const inCart = useAppSelector((state) => state.counter.count)

  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6'>
      <SimpleWidget
        title={inCart.toString()}
        subTitle='Cart Counter'
        label='Counter'
        href='/dashboard/counter'
        icon={<IoCartOutline size={70} className='text-blue-600' />}
      />
    </div>
  )
}
