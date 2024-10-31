import React from 'react';
import { ActivityTable } from './components/ActivityTable';

export default function ActivitiesModule() {
  return (
    <div className="h-full overflow-auto p-6">
      <ActivityTable />
    </div>
  );
}