"use client"
import React from 'react'
import { sideLinks } from '@/constants/Links'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
const pathname =  usePathname();

  return (
    <>
    <div className='w-64 h-screen  bg-gray-800 text-white p-4'>
        {sideLinks.map(({label , route , icon: Icon }) => {
          const isActive = pathname === route;
        
          return (
            <Link
              key={route}
              href={route}
              className={`flex items-center gap-2 mb-4 p-2 text-sm rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-lg">{label}</span>
            </Link>
          );
        })}

    </div>
    </>
  )
}

export default Sidebar