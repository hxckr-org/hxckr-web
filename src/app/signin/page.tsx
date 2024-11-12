"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/primitives/button";
import GithubIcon from "@/public/assets/icons/github";
import JedeIcon from "@/public/assets/icons/jede";

export default function SignIn() {
  return (
    <div className="xl:px-16 lg:py-12 bg-white h-screen w-screen">
      <div className="w-full max-w-[1500px] mx-auto flex items-center justify-center lg:space-x-12 h-[calc(100vh-120px)]">
        <div
          className="border-[1.5px] border-grey-button-border rounded-3xl relative w-full xl:w-[60%] 2xl:w-[60%] h-[100%] hidden xl:block bg-cover object-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/assets/images/sign-up-image-grid.webp')",
          }}
        >
          <Image
            src="/assets/images/dashboard-overview.webp"
            alt="Signin Background"
            width={1000}
            height={1000}
            className="object-contain object-center xl:w-[83.5%] h-full absolute -top-1/2 translate-y-1/2 -right-0"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-10 px-4 h-full xl:h-full w-full xl:w-1/3 text-black">
          <h1 className="text-5xl font-bold font-p22mackinac">
            <JedeIcon className="w-40 h-40" withText />
          </h1>
          <div className="flex flex-col items-center mx-auto space-y-4 lg:space-y-8 w-full">
            <h2 className="text-2xl lg:text-[32px] leading-[42px] font-semibold">
              Log In
            </h2>
            <Button
              onClick={() => {
                signIn("github", {
                  callbackUrl: "/dashboard",
                });
              }}
              className="bg-grey-button-text text-black font-normal rounded-full border border-grey-button-border py-5 flex justify-center w-full md:w-[442px] lg:w-[400px] hover:bg-grey-button-border/50"
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
    </div>
  );
}
