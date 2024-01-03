import { SideBar } from '@/components'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    
      <div className='flex'>
        <SideBar />
        <div className='w-full text-slate-900'>{children}</div>
    </div>
  )
}
