export const Step = ({
  children,
  step,
  title,
}: {
  children: React.ReactNode;
  step: number;
  title: string;
}) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h1>{title}</h1>
      <p>{step}</p>
      {children}
    </div>
  );
};
