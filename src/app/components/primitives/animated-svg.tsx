"use client";

export default function AnimatedSVG({ 
  src,
  className = "",
}: { 
  src: string;
  className?: string;
}) {
  return (
    <div 
      className={`w-full h-full ${className}`}
      dangerouslySetInnerHTML={{
        __html: `
          <object
            type="image/svg+xml"
            data="${src}"
            class="w-full h-full"
          >
          </object>
        `
      }}
    />
  );
}