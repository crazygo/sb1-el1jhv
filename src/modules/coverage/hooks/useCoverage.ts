import { useState } from 'react';

export function useCoverage() {
  const [coverage, setCoverage] = useState(30);

  const handleImprove = () => {
    setCoverage(prev => Math.min(prev + 10, 100));
  };

  return {
    coverage,
    handleImprove,
  };
}