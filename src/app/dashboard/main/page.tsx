import { WidgetsGrid } from '@/components'

export const metadata = {
  title: 'Dashboard Page',
  description: 'Dashboard Page',
}

export default function MainPage() {
  return (
    <div className='text-black'>
      <div className='my-2'>
        <h1 className='text-3xl'>Dashboard</h1>
        <span className='text-xl'>General Information</span>
      </div>

      <WidgetsGrid />
    </div>
  )
}
