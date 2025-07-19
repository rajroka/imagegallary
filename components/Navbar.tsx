"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModalStore } from '@/store/useAuthmodal';
import SignInModal from './SigninModal';
import LoginModal from './LoginModal';
import { useAuthStore } from '@/store/useAuthStore';
import { signOut, useSession } from 'next-auth/react';


const Navbar = () => {
  const path = usePathname();
     const { data: session, status } = useSession();
         
  const { openSignup, openLogin, isSignupOpen, isLoginOpen } = useModalStore();
    const { user   , logout   } = useAuthStore();





 const Logout = ()=>{


    localStorage.removeItem("token"); // 🧹 optional: remove token from storage
    logout(); // ✅ update Zustand state
 }

  return (
    <>
      <div className="h-20 bg-white/60 backdrop-blur-sm  sticky top-0 text-gray-900 shadow w-full px-6 py-3">
        <div className="flex justify-center gap-6 items-center font-medium">
          
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
              path === '/' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            Home
          </Link>

          <Link
            href="/docs"
            className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
              path === '/docs' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            Docs
          </Link>


         {
          session ? ( <>
           <div className="flex items-center gap-2">
                  
                  <Link
                    href="/pro"
                    className="text-blue-600 hover:underline"
                  >
                    <span className="text-gray-700">👤 {user?.name || 'Profile'}</span>
                  </Link>
                </div>
          
          
          <button
            onClick={()=>signOut({callbackUrl: "/"})}
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
          >
            Logout 
          </button>
             
           


          </>  ) :
          (<>
             <button
            onClick={openLogin}
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
          >
            Login
          </button>

          <button
            onClick={openSignup}
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
          >
            Sign In
          </button>
          </>
          )

         }

         

        </div>
      </div>

      {isSignupOpen && <SignInModal />}
      {isLoginOpen && <LoginModal />}
    </>
  );
};

export default Navbar;
