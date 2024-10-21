import Link from "next/link";
import Avatar from "../primitives/avatar";

const avatars = [
  "/assets/images/launching-soon-avatar-1.png",
  "/assets/images/launching-soon-avatar-2.png",
  "/assets/images/launching-soon-avatar-3.png",
  "/assets/images/launching-soon-avatar-4.png",
  "/assets/images/launching-soon-avatar-5.png",
];

export default function BTCMasterySection() {
  return (
    <section className="bg-white pt-32 flex flex-col items-center m-auto">
      <div className="max-w-[1460px] w-full flex flex-col items-center">
        <div
          className="w-[88%] h-screen flex flex-col items-center bg-contain bg-no-repeat bg-center object-cover"
          style={{
            backgroundImage: `url('/assets/images/code-to-prtcl-image.webp')`,
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center">
              <AvatarImageCollection />
              <p className="text-base font-normal text-center">
                We are launching soon
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="font-p22mackinac font-bold text-[2.85rem] text-center leading-[62px] tracking-[-2%] max-w-[750px]">
                Your path to Bitcoin mastery begins here
              </p>
              <p className="text-xl text-grey-text font-light text-center leading-[32px] tracking-[-2%] max-w-[650px]">
                Dive into the Bitcoin world through hands-on projects and a
                thoughtfully designed curriculum.
              </p>
              <Link
                href="/"
                className="bg-purple-primary text-white flex items-center gap-2 rounded-full px-9 py-5 mt-12 text-base leading-[24px] tracking-[-2%] font-normal hover:bg-purple-primary/90"
              >
                See our curriculum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AvatarImageCollection() {
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
