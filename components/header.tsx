import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = ()  => {

  return (
    <div className="fixed bg-white top-0 left-0 right-0 z-50">
      <nav className="bg-white flex justify-between items-center top-1-4 mx-12">
        <Image src="/logo.svg" alt="Logo" width="256" height="256"/>
        <Link className="underline hover:no-underline" href="/">
            Home
          </Link>
      </nav>
    </div>
  )
}

export default Header;