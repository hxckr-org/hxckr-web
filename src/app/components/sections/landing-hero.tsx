import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/primitives/button";
import DiscordIcon from "@/public/assets/icons/discord";
import LottieComponent from "../primitives/lottie";

export default function HeroSection() {
  return (
    <section className="bg-black w-full flex flex-col items-center">
      <div
        className="relative w-full flex flex-col items-center "
        // style={{
        //   backgroundImage: `url('/assets/images/hero-section-grid-line.png')`,
        // }}
      >
        <div className="absolute -top-96 left-0 w-full h-screen border border-red-500">
          <LottieComponent />
        </div>
        <div
          className="z-50 w-screen h-screen 2xl:h-[calc(100vh-130px)] flex flex-col items-center bg-contain bg-no-repeat bg-center object-cover bg-transparent"
          // style={{
          //   backgroundImage: `url('/assets/images/hero-section-image-no-grid.webp')`,
          // }}
        >
          <Banner />
          <div className="flex flex-col items-center gap-6">
            <p className="font-p22mackinac font-bold text-[3.5rem] text-center leading-[72px] max-w-[777px]">
              Learn <span className="italic text-purple-primary">Bitcoin</span>{" "}
              Development at Your Own Pace.
            </p>
            <div className="relative flex flex-col items-center gap-2 max-w-[810px]">
              <p className="font-light text-base text-center text-grey-text leading-7 tracking-[-2%]">
                Learn, build, and grow with hands-on tasks and instant code
                reviews. Join our pioneer program for hands-on learning and
                personalised code feedback loops.
              </p>
              <hr className="w-2/3 h-[1px] bg-grey-text absolute top-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-black mt-10">
            <Button className="px-9 py-5 text-base font-normal hover:bg-purple-primary/90">
              Sign up for updates
            </Button>
            <Link
              href="/"
              className="bg-white text-purple-primary flex items-center gap-2 border border-grey-accent rounded-full px-9 py-5 text-base font-normal hover:border-purple-primary "
            >
              <DiscordIcon />
              Join Our Discord
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Banner = () => {
  return (
    <div className="z-50 bg-white flex items-center gap-2 border border-grey-accent rounded-full px-6 py-3 mt-32 mb-8">
      <Image
        src="/assets/images/filled-star.png"
        alt="filled-star"
        width={15}
        height={15}
      />
      <span className="italic font-p22mackinac font-normal text-base">
        Technical Bitcoin Education For You
      </span>
    </div>
  );
};
