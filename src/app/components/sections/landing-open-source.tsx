import Link from "next/link";
import DiscordIcon from "@/public/assets/icons/discord";
import GithubIcon from "@/public/assets/icons/github";
import OpenSourceIcon from "@/public/assets/icons/open-source";

interface OpenSourceSectionProps {
  title?: string;
  description?: string;
  githubText?: string;
  githubLink?: string;
  discordText?: string;
  discordLink?: string;
}

export default function OpenSourceSection({
  title = "It's Free & Open Source.",
  description = "We believe in free education for all, and our open-source platform provides the resources to learn about Bitcoin, without any barriers.",
  githubText = "GitHub",
  githubLink = "https://github.com/hxckr-org",
  discordText = "Join Our Discord",
  discordLink = "/",
}: OpenSourceSectionProps) {
  return (
    <section className="bg-white flex flex-col items-center py-40">
      <div className="max-w-[1460px] w-full flex flex-col m-auto gap-14">
        <div className="relative z-50 overflow-hidden flex justify-between items-center bg-purple-quaternary border-2 border-purple-secondary rounded-3xl p-16">
          <div className="z-50 flex flex-col items-left gap-y-4">
            <p className="text-[3rem] text-black font-p22mackinac font-bold leading-[68px] tracking-[-2%]">
              {title}
            </p>
            <p className="text-xl text-grey-text font-light leading-[36px] tracking-[-2%] max-w-[600px]">
              {description}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link
                href={githubLink}
                className="bg-purple-primary text-white text-xl px-9 py-5 hover:bg-purple-primary/90 flex items-center gap-2 rounded-full"
                target="_blank"
              >
                <GithubIcon />
                <span>{githubText}</span>
              </Link>
              <Link
                href={discordLink}
                className="bg-white text-purple-primary flex items-center gap-2 border border-grey-accent rounded-full px-9 py-5 text-base font-normal hover:border-purple-primary"
              >
                <DiscordIcon />
                {discordText}
              </Link>
            </div>
          </div>
          <div className="z-50 flex items-center gap-2">
            <OpenSourceIcon />
          </div>

          <div className="absolute z-[5] -bottom-[70px] -left-[100px] flex items-center justify-center w-[440px] h-[440px] bg-[#EDEBFF] shadow-[0px_-0.83px_16.67px_0px_#7762FF1A_inset] rounded-full">
            <div className="w-[370px] h-[370px] bg-purple-accent-secondary rounded-full shadow-[0px_-0.83px_16.67px_0px_#7762FF1A_inset]"></div>
          </div>
          <div className="absolute z-[5] -top-[90px] -right-[70px] flex items-center justify-center w-[385px] h-[385px] bg-[#EDEBFF] shadow-[0px_-0.83px_16.67px_0px_#7762FF1A_inset] rounded-full">
            <div className="w-[320px] h-[320px] bg-purple-accent-secondary rounded-full shadow-[0px_-0.83px_16.67px_0px_#7762FF1A_inset]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
