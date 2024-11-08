"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import Button from "@/app/components/primitives/button";
import GithubIcon from "@/public/assets/icons/github";

export default function SignIn() {
  return (
    <div className="flex justify-between h-screen bg-grey-signin-background">
      <div className="hidden md:block"></div>
      <div className="flex flex-col items-center justify-center space-y-12 px-4 lg:px-16 h-full w-full xl:w-1/3 bg-white text-black">
        <h1 className="text-5xl font-bold font-p22mackinac">JEDE</h1>
        <div className="flex flex-col items-center space-y-4 lg:space-y-8 w-full">
          <h2 className="text-2xl lg:text-[32px] leading-[42px] font-semibold">
            Log In
          </h2>
          <Button
            onClick={() => {
              signIn("github", {
                callbackUrl: "/dashboard",
              });
            }}
            className="bg-grey-button-text text-black font-normal rounded-full border border-grey-button-border py-5 flex justify-center w-full lg:w-[442px] hover:bg-grey-button-border/50"
          >
            <GithubIcon
              fill="black"
              props={{
                className: "bg-black text-black",
              }}
            />
            Continue with GitHub
          </Button>
        </div>
        <Link
          href="/privacy-policy"
          className="text-sm text-[#5A5B5C] font-normal underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
