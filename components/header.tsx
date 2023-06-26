import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-3 from-rose-300 to-rose-100 bg-gradient-to-r">
      <nav className="flex items-center justify-between mx-4 from-rose-300 to-rose-100 top-1-4 bg-gradient-to-r">
        <Image src="/logo.svg" alt="Logo" width="256" height="256" />
        <Link className="underline hover:no-underline" href="/">
          Home
        </Link>
      </nav>
    </div>
  );
};

export default Header;
