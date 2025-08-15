"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import FastingGlucose from "./FastingGlucose";
import { useState } from "react";
import AfterFoodGlucose from "./AfterFoodGlucose";

export function LogDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const defaultValues = [];
  const [values, setValues] = useState([]);

  const onNextStep = () => {
    setStep(step + 1 > 1 ? 1 : step + 1);
  };
  const onPrevStep = () => {
    setStep(step - 1 < 0 ? 0 : step - 1);
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        {step === 0 ? (
          <FastingGlucose onNextStep={onNextStep} onPrevStep={onPrevStep} />
        ) : (
          <AfterFoodGlucose onNextStep={onNextStep} onPrevStep={onPrevStep} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
