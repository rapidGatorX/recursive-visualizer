import { useState, useEffect, useRef } from "react";
import { Box } from "./Box";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const RecursionVisualizer = () => {
  const [boxes, setBoxes] = useState<Array<{ level: number; isActive: boolean; isVisited: boolean }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [phase, setPhase] = useState<"forward" | "backward">("forward");
  const MAX_DEPTH = 10;
  const containerRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setBoxes([]);
    setCurrentLevel(0);
    setPhase("forward");
    setIsPlaying(false);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [boxes]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (phase === "forward") {
        if (currentLevel < MAX_DEPTH) {
          setBoxes(prev => [...prev, { level: currentLevel + 1, isActive: true, isVisited: false }]);
          setCurrentLevel(prev => prev + 1);
          if (currentLevel + 1 === MAX_DEPTH) {
            setPhase("backward");
            toast("Maximum depth reached (10 boxes)! Starting backtrack...", {
              duration: 2000,
            });
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
          toast("Visualization complete!", {
            duration: 2000,
          });
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying, currentLevel, phase]);

  return (
    <div className="flex flex-col items-center gap-8 h-[calc(100vh-12rem)]">
      <div className="flex gap-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
          className="min-w-[100px]"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button onClick={reset} variant="outline" className="min-w-[100px]">
          Reset
        </Button>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 w-full flex flex-col items-center gap-4 overflow-y-auto px-4 py-2"
      >
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
      
      <div className="text-lg font-semibold flex items-center gap-2">
        <span>Boxes Created: {currentLevel}</span>
        <span className="text-primary">{currentLevel === MAX_DEPTH && phase === "backward" ? "(Max Depth Reached!)" : ""}</span>
      </div>
    </div>
  );
};