

export default function SidebarMenuItem({text ,Icon ,active}) {
  return (
    <div className="hoverEffect flex items-center text-gray-700  xl:justify-start text-lg space-x-3">
        <Icon className='h-7 ml-2'/>
        <span className={`${active && 'font-bold'} hidden lg:inline`}>{text}</span>
      
   
    </div>
  )
}
