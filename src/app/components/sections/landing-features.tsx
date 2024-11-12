import Image from "next/image";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
  title?: string;
  subtitle?: string;
}

const defaultFeatures = [
  {
    image: "/assets/images/features-coding-1.png",
    title: "Automated Code Review",
    description:
      "Receive real-time feedback on your code through integrated CI/CD pipelines.",
  },
  {
    image: "/assets/images/features-chart-2.png",
    title: "Progress Tracker",
    description: "Track your progress and get feedback on your code.",
  },
  {
    image: "/assets/images/features-cubes-3.png",
    title: "Project-based Learning",
    description: "Dive into real-world projects to apply your skills.",
  },
];

export default function FeaturesSection({
  features = defaultFeatures,
  title = "Explore Our Features",
  subtitle = "Explore our features and see how they can transform your development journey",
}: FeaturesSectionProps) {
  return (
    <section className="bg-white flex flex-col items-center pt-10 pb-10">
      <div className="max-w-[1460px] h-[calc(100vh-50%)] w-full flex flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[2.85rem] font-p22mackinac font-bold text-center leading-[62px] tracking-[-2%] max-w-[750px]">
            {title}
          </p>
          <p className="text-xl text-grey-text font-light text-center leading-[30px] tracking-[-2%] max-w-[650px]">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-10 px-1 md:px-8 lg:px-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  image,
  title,
  description,
  index,
}: {
  image: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="bg-purple-accent bg-contain bg-no-repeat flex flex-col items-center gap-10 h-full w-full border-[0.5px] border-purple-secondary rounded-xl px-10 py-16"
      style={{
        backgroundImage: `url('/assets/images/feature-card-bg.webp')`,
      }}
    >
      <div
        key={index}
        className="w-[60px] h-[60px] p-2 bg-purple-primary rounded-[4px]"
      >
        <Image src={image} width={60} height={60} alt="Feature" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-2xl font-p22mackinac font-bold text-purple-primary text-center">
          {title}
        </p>
        <p className="text-base text-grey-text font-light text-center leading-[28px] tracking-[-2%] max-w-[350px]">
          {description}
        </p>
      </div>
    </div>
  );
}
