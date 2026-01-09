/**
 * Main Page Component
 * 
 * Entry point for the Visual Pipeline Designer
 */

import PipelineDesigner from '@/components/PipelineDesigner';

export default function Home() {
  return (
    <main className="h-screen w-full">
      <PipelineDesigner />
    </main>
  );
}
