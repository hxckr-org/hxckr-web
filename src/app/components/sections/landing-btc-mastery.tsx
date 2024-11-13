import Link from "next/link";
import Image from "next/image";
import Avatar from "../primitives/avatar";
import AnimatedSVG from "../primitives/animated-svg";

interface BTCMasterySectionProps {
  avatars?: string[];
  title?: string;
  description?: string;
  launchingText?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

const defaultAvatars = [
  "/assets/images/launching-soon-avatar-1.png",
  "/assets/images/launching-soon-avatar-2.png",
  "/assets/images/launching-soon-avatar-3.png",
  "/assets/images/launching-soon-avatar-4.png",
  "/assets/images/launching-soon-avatar-5.png",
];

export default function BTCMasterySection({
  avatars = defaultAvatars,
  title = "Your path to Bitcoin mastery begins here",
  description = "Dive into the Bitcoin world through hands-on projects and a thoughtfully designed curriculum.",
  launchingText = "We are launching soon",
  ctaText = "See our curriculum",
  ctaLink = "/#curriculum",
  image = "/assets/images/code-to-prtcl-image.webp",
}: BTCMasterySectionProps) {
  return (
    <section className="bg-white pt-10 pb-10 flex flex-col items-center m-auto">
      <div className="max-w-[1460px] w-full flex flex-col items-center">
        <div className="w-[88%] relative">
          <div className="relative z-10">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center">
                <AvatarImageCollection avatars={avatars} />
                <p className="text-sm sm:text-base font-normal text-center">
                  {launchingText}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="font-p22mackinac font-bold text-xl sm:text-2xl md:text-3xl lg:text-[2.85rem] text-center leading-[1.4] lg:leading-[62px] tracking-[-2%] max-w-[750px]">
                  {title}
                </p>
                <p className="text-base sm:text-lg md:text-xl text-grey-text font-light text-center leading-[1.6] md:leading-[32px] tracking-[-2%] max-w-[650px]">
                  {description}
                </p>
                <Link
                  href={ctaLink}
                  className="bg-purple-primary text-white flex items-center gap-2 rounded-full px-6 sm:px-9 py-4 sm:py-5 mt-8 sm:mt-12 text-sm sm:text-base leading-[24px] tracking-[-2%] font-normal hover:bg-purple-primary/90 z-10"
                >
                  {ctaText}
                </Link>
              </div>
              <div className="w-full mt-[-100px] sm:mt-[-200px] md:mt-[-300px] lg:mt-[-400px]">
                <div className="block sm:hidden">
                  <Image 
                    src="/assets/images/btc-mastery-mobile.svg"
                    alt="Bitcoin Mastery"
                    width={361}
                    height={524}
                    className="w-full h-auto"
                  />
                </div>
                <div className="hidden sm:block">
                  <AnimatedSVG
                    src="/assets/animations/btc-mastery.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AvatarImageCollection({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex -space-x-1">
        {avatars.map((avatar, index) => (
          <div
            key={avatar}
            className="w-7 h-7 rounded-full overflow-hidden"
            style={{
              zIndex: avatars.length - index,
            }}
          >
            <Avatar
              src={avatar}
              alt={`Person ${index + 1}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
