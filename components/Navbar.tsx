"use client";

import Link from 'next/link';
import { publicLinks, privateLinks } from '@/constants/Links';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const path = usePathname();
  const { data: session , status } = useSession();

  const maplink = session ? privateLinks : publicLinks;
   
  return (
    <nav className=" h-20  bg-white/60 backdrop-blur-sm text-gray-900 shadow
 w-full px-6 py-3">
      <div className="flex justify-center gap-6 sm:gap-10 items-center font-medium">
        {maplink.map(({ name, route, icon: Icon , action   }) => {
          const isActive = path === route;

   if(status === 'loading')
    return null

            if (action === 'signin') {
            return (
              <button
                key={name}
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
              >
                {Icon && <Icon className="w-5 h-5" />}
                {name}
              </button>
            );
          }

          if (action === 'signout') {
            return (
              <button
                key={name}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
              >
                {Icon && <Icon className="w-5 h-5" />}
                {name}
              </button>
            );
          }
          return (
            <Link
              key={route}
              href={route}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300
                ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}
              `}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-base sm:text-lg">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
