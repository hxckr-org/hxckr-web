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
    <div className="bg-white p-4 rounded-lg">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};
