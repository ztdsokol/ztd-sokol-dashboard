"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky px-10 py--4 fex flex-col gap-4 border-r-1 border-black max-lg:hidden ">
      <div className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
