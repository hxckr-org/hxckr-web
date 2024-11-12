import Image from "next/image";
import AnimatedSVG from "../primitives/animated-svg";

interface CurriculumSectionProps {
  subtitle?: string;
  image?: string;
}

export default function CurriculumSection({
  subtitle = "The challenges would be divided into three challenge categories: types, modes, and languages.",
  image = "/assets/animations/curriculum.svg",
}: CurriculumSectionProps) {
  return (
    <section className="bg-purple-accent flex flex-col pt-10 pb-10" id="curriculum">
      <div className="max-w-[1460px] w-full flex flex-col m-auto gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.85rem] text-grey-text italic font-p22mackinac font-normal text-center leading-[1.4] lg:leading-[62px] tracking-[-2%]">
            Our Curriculum:{" "}
            <span className="text-black font-p22mackinac font-bold">
              Take a sneak-peek
            </span>
          </p>
          <p className="text-grey-text text-base sm:text-lg md:text-xl text-center font-light tracking-[-2%] leading-[1.6] sm:leading-[36px] max-w-[700px]">
            {subtitle}
          </p>
        </div>
        <div className="w-full mt-[-100px] sm:mt-[-150px] md:mt-[-200px] lg:mt-[-300px]">
          <AnimatedSVG
            src={image}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
