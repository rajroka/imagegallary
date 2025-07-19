"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaImage, FaUpload, FaUser } from "react-icons/fa";

const sideLinks = [
  { label: "Home", route: "/dashboard", icon: FaHome },
  { label: "Upload", route: "/dashboard/upload", icon: FaUpload },
  { label: "Gallery", route: "/dashboard/gallery", icon: FaImage },
  { label: "Profile", route: "/dashboard/profile", icon: FaUser },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {sideLinks.map(({ label, route, icon: Icon }) => {
          const isActive = pathname === route;
          return (
            <Link
              key={route}
              href={route}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-md">{label}</span>
            </Link>
          );
        })}
         <button onClick={() => signOut({ callbackUrl: "/" })}>
  Sign Out
</button>

      </nav>
    </div>
  );
};

export default Sidebar;
