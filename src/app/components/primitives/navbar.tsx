"use client";

import Link from "next/link";

import GithubIcon from "@/public/assets/icons/github";

export default function Navbar() {
  return (
    <header className="z-50 bg-purple-accent flex flex-col justify-between items-center">
      <div className="z-50 w-full max-w-[1062px] h-[77px] m-auto mt-12 py-4 px-8 flex justify-between items-center rounded-[80px] border-[1.5px] border-grey-accent">
        <div className="text-2xl font-bold">
          <Link href="/">LOGO</Link>
        </div>
        <nav className="flex gap-10 text-grey-text font-light items-center">
          <Link href="#features" className="hover:text-purple-primary">
            Features
          </Link>
          <Link href="#faqs" className="hover:text-purple-primary">
            FAQs
          </Link>
          {/* TODO: @extheo should confirm what contact is */}
          {/* <Link href="#contact" className="hover:text-purple-primary">
            Contact Us
          </Link> */}
        </nav>
        <Link
          href="https://github.com/hxckr-org"
          className="bg-purple-primary text-white text-sm px-5 py-3 hover:bg-purple-primary/90 flex items-center gap-2 rounded-full"
          target="_blank"
        >
          <GithubIcon />
          <span>GitHub</span>
        </Link>
      </div>
    </header>
  );
}
