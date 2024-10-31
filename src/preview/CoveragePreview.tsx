import React from 'react';
import TestCoverageModule from '@/modules/coverage/TestCoverageModule';
import { ThemeProvider } from "@/components/theme-provider";

export default function CoveragePreview() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="h-[600px] w-[480px] mx-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-background shadow-lg">
          <TestCoverageModule />
        </div>
      </div>
    </ThemeProvider>
  );
}