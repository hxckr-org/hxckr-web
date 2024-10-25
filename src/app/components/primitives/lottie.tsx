"use client";

import Lottie from '@lottielab/lottie-player/react';

export default function LottieComponent({ 
  src = "https://cdn.lottielab.com/l/79r75TAX9dXH1D.json",
  autoplay = true,
  loop = true,
  style = {}
}: { 
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
}) {
  return <Lottie 
    src={src} 
    autoplay={autoplay} 
    loop={loop}
    style={{ width: '100%', height: '100%', ...style }}
  />;
}
