import React, { useState } from "react";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

export default function Reader({
  readingIndex,
  title,
  desc,
  min,
  max,
  unit,
  step,
  reading,
  disabled,
  setReading,
  onNextStep,
  onPrevStep,
}: {
  readingIndex: number;
  title: string;
  desc: string;
  min: number;
  max: number;
  unit: string;
  step: number;
  optimal: number;
  reading: number;
  disabled: boolean;
  setReading: (val: number) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}) {
  function onClick(adjustment: number) {
    setReading(Math.max(min, Math.min(max, reading + adjustment)));
  }
  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{desc}</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-step)}
            disabled={disabled || reading <= min}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">{reading}</div>
            <div className="text-muted-foreground text-[0.70rem]">{unit}</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(step)}
            disabled={disabled || reading >= max}
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <DrawerFooter>
        <div className="flex gap-4 justify-between w-full">
          <Button
            onClick={onPrevStep}
            disabled={disabled || readingIndex === 0}
          >
            Prev
          </Button>
          <Button onClick={onNextStep} disabled={disabled}>
            Next
          </Button>
        </div>
        <DrawerClose asChild>
          <Button variant="outline" disabled={disabled}>
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
