
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children} : {children : any } ) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <Sidebar />
           <main>
          {children}
           </main>

      </div>


      
    </div>
  )
}

export default layout