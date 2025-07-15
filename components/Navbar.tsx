"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModalStore } from '@/store/useAuthmodal';
import SignInModal from './SigninModal';
import LoginModal from './LoginModal';
import { useSelector  , useDispatch} from 'react-redux';
import { logout } from '@/redux/slice/authSlice';
const Navbar = () => {
  const path = usePathname();
   
         const dispatch = useDispatch()
  const { openSignup, openLogin, isSignupOpen, isLoginOpen } = useModalStore();
 const { isLoggedIn,    } = useSelector((state : any) => state.auth);

 const Logout = ()=>{

     dispatch(logout()); // 🧠 update Redux state
    localStorage.removeItem("token"); // 🧹 optional: remove token from storage
  
 }

  return (
    <>
      <div className="h-20 bg-white/60 backdrop-blur-sm text-gray-900 shadow w-full px-6 py-3">
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
          isLoggedIn ? ( <button
            onClick={Logout}
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors duration-300"
          >
            Logout 
          </button> ) :
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
