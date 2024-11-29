import { cn } from "@/lib/utils";

interface BoxProps {
  level: number;
  isActive: boolean;
  isVisited: boolean;
  maxDepth: number;
}

export const Box = ({ level, isActive, isVisited, maxDepth }: BoxProps) => {
  const size = Math.max(100 - level * 8, 40); // Increased base size from 60 to 100

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 animate-box-appear",
        isActive && "bg-primary animate-pulse shadow-primary/50",
        isVisited && "animate-box-visited",
        !isActive && !isVisited && "bg-gray-100"
      )}
      style={{
        width: size,
        height: size,
        margin: "1rem", // Added margin for better spacing
      }}
    >
      <span className={cn(
        "text-lg font-bold",
        isActive || isVisited ? "text-white" : "text-gray-600"
      )}>
        {level}
      </span>
    </div>
  );
};