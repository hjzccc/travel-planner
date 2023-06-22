import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = ()  => {

  return (
    <div id="app-container">
      <nav className="flex justify-between items-center top-1-4 mx-12">
        <Image src="/logo.svg" alt="Logo" width="256" height="256"/>
        <Link className="navbar-brand" href="/">
            Home
          </Link>
      </nav>
    </div>
  )
}

export default Header;