import Image from "next/image";

interface CurriculumSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

export default function CurriculumSection({
  title = "Our Curriculum: Take a sneak-peek",
  subtitle = "The challenges would be divided into three challenge categories: types, modes, and languages.",
  image = "/assets/images/curriculum-section-image.webp",
}: CurriculumSectionProps) {
  return (
    <section className="bg-purple-accent flex flex-col py-32">
      <div className="max-w-[1460px] w-full flex flex-col m-auto gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[2.85rem] text-grey-text italic font-p22mackinac font-normal text-center leading-[62px] tracking-[-2%]">
            Our Courses:{" "}
            <span className="text-black font-p22mackinac font-bold">
              Take a sneak-peek
            </span>
          </p>
          <p className="text-grey-text text-xl text-center font-light tracking-[-2%] leading-[36px] max-w-[700px]">
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col w-full pt-10 px-20 overflow-hidden">
          <Image
            src={image}
            alt="Curriculum Overview"
            width={1460}
            height={700}
            className="w-[1440px] 2xl:w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
