'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectGanttPageView from '@/lib/gantt-chart/ui/project-gantt-page';

function GanttPageInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId') ?? undefined;
  return <ProjectGanttPageView projectId={projectId} />;
}

export default function GanttPage() {
  return (
    <Suspense fallback={null}>
      <GanttPageInner />
    </Suspense>
  );
}
