import React from 'react';
import { GrayConfigTable } from './components/GrayConfigTable';

export default function GrayConfigModule() {
  return (
    <div className="h-full overflow-auto p-6">
      <GrayConfigTable />
    </div>
  );
}