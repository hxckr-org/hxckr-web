"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import GithubIcon from "@/public/assets/icons/github";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-[999] bg-purple-accent flex flex-col justify-between items-center px-4">
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[998] md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <div className="relative z-[999] w-full max-w-[1062px] h-[77px] m-auto mt-12 py-4 px-8 flex justify-between items-center rounded-[80px] border-[1.5px] border-grey-accent">
        <div className="text-2xl font-bold -ml-8">
          <Link href="/">
            <Image 
              src="/assets/images/logo.svg"
              alt="Logo"
              width={116}
              height={88}
              priority
            />
          </Link>
        </div>
        
        <button 
          className="md:hidden fixed right-8 z-[1001]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-grey-text transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-grey-text ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-0.5 bg-grey-text transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
        
        <nav className={`
          flex gap-10 text-grey-text font-light items-center
          md:flex
          max-md:fixed max-md:top-0 max-md:right-0 max-md:h-screen max-md:w-64 
          max-md:bg-white max-md:p-8 max-md:flex-col max-md:items-start
          max-md:transform ${isMenuOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
          max-md:transition-transform max-md:duration-300 max-md:ease-in-out
          ${isMenuOpen ? 'max-md:flex' : 'max-md:hidden'}
          max-md:z-[1000]
        `}>
          <Link href="#features" className="hover:text-purple-primary">
            Features
          </Link>
          <Link href="/faqs" className="hover:text-purple-primary">
            FAQs
          </Link>
          <Link href="mailto:isahtheophilus@gmail.com" className="hover:text-purple-primary" target="_blank" rel="noopener noreferrer">Contact Us</Link>

        </nav>

        <Link
          href="https://github.com/hxckr-org"
          className="bg-purple-primary text-white text-sm px-5 py-3 hover:bg-purple-primary/90 items-center gap-2 rounded-full max-md:hidden flex"
          target="_blank"
        >
          <GithubIcon />
          <span>GitHub</span>
        </Link>
      </div>
    </header>
  );
}
