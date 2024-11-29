import { cn } from "@/lib/utils";

interface BoxProps {
  level: number;
  isActive: boolean;
  isVisited: boolean;
  maxDepth: number;
}

export const Box = ({ level, isActive, isVisited, maxDepth }: BoxProps) => {
  const size = Math.max(60 - level * 4, 30); // Decrease size with depth

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg shadow-md transition-all duration-300 animate-box-appear",
        isActive && "bg-primary animate-pulse",
        isVisited && "animate-box-visited",
        !isActive && !isVisited && "bg-gray-100"
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <span className="text-sm font-semibold text-white">
        {level}
      </span>
    </div>
  );
};