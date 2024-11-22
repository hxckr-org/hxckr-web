export const Step = ({ children, step, title }: { children: React.ReactNode; step: number; title: string }) => {
  return (
    <div className='rounded-lg flex flex-col gap-3'>
      <section className='flex items-center gap-1'>
        <p className='text-base text-purple-primary font-semibold'>Step {step}:</p>
        <h1 className='text-base text-black font-medium'>{title}</h1>
      </section>
      <section>{children}</section>
    </div>
  );
};
