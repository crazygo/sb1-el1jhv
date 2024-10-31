import React, { useState } from 'react';
import { CoverageDisplay } from './components/CoverageDisplay';
import { DragDropArea } from './components/DragDropArea';
import { ProgressSteps } from './components/ProgressSteps';
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { PromotionalPoints } from './components/PromotionalPoints';
import { AnalysisChat } from './components/AnalysisChat';
import { FileStorageManager } from './utils/fileUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { FileStorage } from './types';

export default function TestCoverageModule() {
  const [hasFiles, setHasFiles] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [fileStorage, setFileStorage] = useState<FileStorageManager | null>(null);
  const [fileStats, setFileStats] = useState<FileStorage | null>(null);

  const handleFileDrop = (storage: FileStorageManager) => {
    setFileStorage(storage);
    setFileStats(storage.getStorage());
    startAnalysis();
  };

  const startAnalysis = () => {
    setHasFiles(true);
    setIsAnalyzing(true);
    setCurrentStep(1);
    
    setTimeout(() => setCurrentStep(2), 300);
    setTimeout(() => setCurrentStep(3), 600);
    setTimeout(() => {
      setCurrentStep(4);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 900);
  };

  const handleTest = () => {
    startAnalysis();
  };

  return (
    <div className="flex flex-col h-full p-6">
      <AnimatePresence>
        {!analysisComplete && (
          <motion.div 
            className="mb-8"
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">提高单测覆盖率</h2>
            <PromotionalPoints />
          </motion.div>
        )}
      </AnimatePresence>
      
      {(hasFiles || isAnalyzing) && !analysisComplete && (
        <ProgressSteps currentStep={currentStep} fileCount={fileStats?.totalCount} />
      )}

      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-grow"
        >
          <AnalysisChat fileStorage={fileStats} />
        </motion.div>
      )}

      {!hasFiles && !isAnalyzing && !analysisComplete && (
        <>
          <DragDropArea onFileDrop={handleFileDrop} />
          <div className="flex flex-col items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={handleTest}
                    className="w-full"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    提高覆盖率
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>请拖拽文件过来</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
}