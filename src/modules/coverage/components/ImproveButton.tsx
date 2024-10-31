import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

interface ImproveButtonProps {
  onImprove: () => void;
  disabled?: boolean;
}

export function ImproveButton({ onImprove, disabled = true }: ImproveButtonProps) {
  return (
    <Button 
      onClick={onImprove} 
      className="mt-6 w-full"
      disabled={disabled}
    >
      <BarChart className="mr-2 h-4 w-4" />
      提高覆盖率
    </Button>
  );
}