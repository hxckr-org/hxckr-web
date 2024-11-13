import Image from "next/image";
import Link from "next/link";
import DiscordIcon from "@/public/assets/icons/discord";
import AnimatedSVG from '../primitives/animated-svg';
import SubscribeButton from "../primitives/subscribe-button";

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
    <div className="relative w-full flex flex-col items-center bg-[#FAFAFF] pt-32 pb-10">
      <div className="w-screen flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-10">
        <Banner text={bannerText} />
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-4">
          <p className="font-p22mackinac font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-center leading-[1.2] sm:leading-[1.3] md:leading-[1.4] lg:leading-[72px] max-w-[777px] text-black">
            Learn <span className="italic text-purple-primary">Bitcoin</span>{" "}
            {title}
          </p>
          <div className="relative flex flex-col items-center gap-2 max-w-[810px]">
            <p className="font-light text-base sm:text-lg md:text-xl lg:text-2xl text-center text-grey-text leading-[1.6] md:leading-7 tracking-[-2%] px-4 sm:px-6">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-black mt-4 z-50">
          <SubscribeButton
            signUpButtonText={signUpButtonText}
            className="w-full sm:w-auto px-6 sm:px-9 py-4 sm:py-5 text-base sm:text-lg text-white font-normal hover:bg-purple-primary/90"
          />
          <Link
            href="/"
            className="w-full sm:w-auto bg-white text-purple-primary flex items-center justify-center gap-2 border border-grey-accent rounded-full px-6 sm:px-9 py-4 sm:py-5 text-base sm:text-lg font-normal hover:border-purple-primary"
          >
            <DiscordIcon />
            {discordButtonText}
          </Link>
        </div>
        <div className="w-full mt-[-100px] sm:mt-[-200px] md:mt-[-300px] lg:mt-[-400px] xl:mt-[-500px] 2xl:mt-[-600px]">
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
    <div className="z-50 bg-white flex items-center gap-2 border border-grey-accent rounded-full px-4 sm:px-6 py-2 sm:py-3 mt-6 sm:mt-8 mb-6 sm:mb-8">
      <Image
        src="/assets/images/filled-star.png"
        alt="filled-star"
        width={15}
        height={15}
      />
      <span className="italic font-p22mackinac font-normal text-base sm:text-lg">
        {text}
      </span>
    </div>
  );
};

HeroSection.Banner = Banner;
