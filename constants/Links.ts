import { Camera } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { FaUserAlt, FaHome, FaUpload, FaImages, FaCog, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const publicLinks = [
  {
    name: 'Home',
    route: '/',
    icon: MdDashboard,
  } as const,
  {
    name: 'About',
    route: '/about',
    icon: Camera,
  } as const,
  {
    name: 'Contact',
    route: '/contact',
    icon: Camera,
  } as const,
  {
    name: 'Sign In',
    route: '/signin',
    icon: FaSignInAlt,
    action: 'signin', // 🔑 special flag for handling auth
  } as const,
   {
    name: 'Login',
    route: '/Login',
    icon: FaSignInAlt,
    action: 'login', // 🔑 special flag for handling auth
  } as const,
] as const;

const privateLinks = [
  {
    name: 'Profile',
    route: '/profile',
    icon: FaUserAlt,
  } as const,
  {
    name: 'Sign Out',
    route: '#',
    icon: FaSignOutAlt,
    action: 'signout', // 🔑 special flag for handling auth
  } as const,
] as const;

const sideLinks = [
  { label: 'Home', route: '/dashboard', icon: FaHome },
  { label: 'Upload', route: '/dashboard/upload', icon: FaUpload },
  { label: 'My Gallery', route: '/dashboard/gallery', icon: FaImages },
  { label: 'Settings', route: '/dashboard/settings', icon: FaCog },
];

export { publicLinks, privateLinks, sideLinks };
