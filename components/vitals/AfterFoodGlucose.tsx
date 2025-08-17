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

export default function AfterFoodGlucose({
  onNextStep,
  onPrevStep,
}: {
  onNextStep: () => void;
  onPrevStep: () => void;
}) {
  const [reading, setReading] = useState(120);

  function onClick(adjustment: number) {
    setReading(Math.max(120, Math.min(400, reading + adjustment)));
  }
  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Blood Glucose (After food)</DrawerTitle>
        <DrawerDescription>
          Record your glucose reading after food
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-10)}
            disabled={reading <= 70}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">{reading}</div>
            <div className="text-muted-foreground text-[0.70rem]">mg/dL</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(10)}
            disabled={reading >= 300}
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <DrawerFooter>
        <div className="flex gap-4 justify-between w-full">
          <Button onClick={onPrevStep}>Prev</Button>
          <Button onClick={onNextStep}>Next</Button>
        </div>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
