export const LoadingSpinner = ({ size }: { size: "small" | "large" }) => {
  const sizeClasses = size === "small" ? "h-6 w-6" : "h-14 w-14";

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${sizeClasses}`}>
        {/* Outer spinning ring */}
        <div
          className={`absolute inset-0 animate-spin rounded-full
            border-[3px] border-transparent
            border-t-violet-600 border-r-violet-400
            [animation-duration:1.5s]`}
        />
        {/* Inner spinning ring */}
        <div
          className={`absolute inset-[2px] animate-spin rounded-full
            border-[3px] border-transparent
            border-b-violet-500 border-l-violet-300
            [animation-duration:1s] [animation-direction:reverse]`}
        />
        {/* Center dot */}
        <div
          className="absolute inset-[30%] rounded-full bg-violet-500 
            animate-pulse [animation-duration:1s]"
        />
      </div>
    </div>
  );
};
