import { useState, useEffect } from "react";
import { Box } from "./Box";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const RecursionVisualizer = () => {
  const [boxes, setBoxes] = useState<Array<{ level: number; isActive: boolean; isVisited: boolean }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [phase, setPhase] = useState<"forward" | "backward">("forward");
  const MAX_DEPTH = 10;

  const reset = () => {
    setBoxes([]);
    setCurrentLevel(0);
    setPhase("forward");
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (phase === "forward") {
        if (currentLevel < MAX_DEPTH) {
          setBoxes(prev => [...prev, { level: currentLevel + 1, isActive: true, isVisited: false }]);
          setCurrentLevel(prev => prev + 1);
          if (currentLevel + 1 === MAX_DEPTH) {
            setPhase("backward");
            toast("Maximum depth reached! Starting backtrack...");
          }
        }
      } else {
        if (currentLevel > 0) {
          setBoxes(prev => 
            prev.map((box, i) => 
              i === currentLevel - 1 ? { ...box, isActive: false, isVisited: true } : box
            )
          );
          setCurrentLevel(prev => prev - 1);
        } else {
          setIsPlaying(false);
          toast("Visualization complete!");
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, currentLevel, phase]);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex gap-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={reset} variant="outline">
          Reset
        </Button>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {boxes.map((box, index) => (
          <Box
            key={index}
            level={box.level}
            isActive={box.isActive}
            isVisited={box.isVisited}
            maxDepth={MAX_DEPTH}
          />
        ))}
      </div>
      
      <div className="text-lg font-semibold">
        Current Depth: {currentLevel} / {MAX_DEPTH}
      </div>
    </div>
  );
};