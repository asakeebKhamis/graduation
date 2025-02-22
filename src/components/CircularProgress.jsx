import { useState, useEffect } from "react";

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 8,
  color = "#22c55e",
  animationDuration = 1000,
  showValue = false,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const progress = (currentTime - startTime) / animationDuration;
      if (progress < 1) {
        setAnimatedValue(Math.min(value * progress, value));
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value);
      }
    };
    animate();
  }, [value, animationDuration]);

  // Calculate the circle's properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (animatedValue / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="transition-all duration-300 ease-in-out"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showValue && (
        <div className="absolute text-sm font-medium">
          {Math.round(animatedValue)}%
        </div>
      )}
    </div>
  );
}
