export const ContentBox = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white p-5 rounded-t-lg">
      <section>
        <h1 className="text-lg font-semibold text-black leading-[30px]">
          {title}
        </h1>
        <p className="text-sm font-light leading-[26px] text-grey-secondary-text pb-4">
          {description}
        </p>
      </section>
      <div className="flex flex-col gap-5 pb-10">{children}</div>
    </div>
  );
};
