export const GitPushText = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 bg-grey-card-border font-normal">
      <p className="text-base text-grey-tertiary-text">{content}</p>
    </div>
  );
};
