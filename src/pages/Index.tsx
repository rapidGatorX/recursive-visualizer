import { RecursionVisualizer } from "@/components/RecursionVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Recursion Visualizer
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Watch how recursion works step by step. Each box represents a function call,
          and the visualization shows both the forward progression and backward resolution.
        </p>
        <RecursionVisualizer />
      </div>
    </div>
  );
};

export default Index;