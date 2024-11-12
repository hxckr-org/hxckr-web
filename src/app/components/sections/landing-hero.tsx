import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/primitives/button";
import DiscordIcon from "@/public/assets/icons/discord";
import AnimatedSVG from '../primitives/animated-svg';

interface HeroSectionProps {
  title?: string;
  description?: string;
  bannerText?: string;
  signUpButtonText?: string;
  discordButtonText?: string;
}

export default function HeroSection({
  title = "Development at Your Own Pace.",
  description = "Learn, build, and grow with hands-on tasks and instant code reviews. Join our pioneer program for hands-on learning and personalised code feedback loops.",
  bannerText = "Technical Bitcoin Education For You",
  signUpButtonText = "Sign up for updates",
  discordButtonText = "Join Our Discord",
}: HeroSectionProps) {
  return (
    <div className="relative w-full flex flex-col items-center bg-[#FAFAFF]">
      <div className="w-screen flex flex-col items-center">
        <Banner text={bannerText} />
        <div className="flex flex-col items-center gap-8 mb-4">
          <p className="font-p22mackinac font-bold text-[3.5rem] text-center leading-[72px] max-w-[777px] text-black">
            Learn <span className="italic text-purple-primary">Bitcoin</span>{" "}
            {title}
          </p>
          <div className="relative flex flex-col items-center gap-2 max-w-[810px]">
            <p className="font-light text-base text-center text-grey-text leading-7 tracking-[-2%]">
              {description}
            </p>
            <hr className="w-2/3 h-[1px] bg-grey-text absolute top-1/2" />
          </div>
        </div>
        <div className="flex items-center gap-4 text-black mt-4 z-50">
          <Button className="px-9 py-5 text-base text-white font-normal hover:bg-purple-primary/90">
            {signUpButtonText}
          </Button>
          <Link
            href="/"
            className="bg-white text-purple-primary flex items-center gap-2 border border-grey-accent rounded-full px-9 py-5 text-base font-normal hover:border-purple-primary"
          >
            <DiscordIcon />
            {discordButtonText}
          </Link>
        </div>
        <div className="w-full mt-[-200px] sm:mt-[-250px] md:mt-[-300px] lg:mt-[-400px]">
          <AnimatedSVG 
            src="/assets/animations/hero.svg" 
            className="w-full h-full"
          />
        </div>

      </div>
    </div>
  );
}

interface BannerProps {
  text?: string;
}

export const Banner = ({ text = "Technical Bitcoin Education For You" }: BannerProps) => {
  return (
    <div className="z-50 bg-white flex items-center gap-2 border border-grey-accent rounded-full px-6 py-3 mt-8 mb-8">
      <Image
        src="/assets/images/filled-star.png"
        alt="filled-star"
        width={15}
        height={15}
      />
      <span className="italic font-p22mackinac font-normal text-base">
        {text}
      </span>
    </div>
  );
};

HeroSection.Banner = Banner;
