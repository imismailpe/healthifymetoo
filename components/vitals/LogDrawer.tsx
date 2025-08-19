"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";
import Reader from "./Reader";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { useQueryClient } from "@tanstack/react-query";

export function LogDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [readingIndex, setReadingIndex] = useState(0);
  const defaultValues = [110, 220, 15, 50];
  const [values, setValues] = useState(defaultValues);
  const queryClient = useQueryClient();
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";
  const [isPending, setIsPending] = useState(false);

  const onNextStep = () => {
    if (readingIndex + 1 < 4) {
      setReadingIndex(readingIndex + 1);
    } else {
      onSubmit();
    }
  };
  const onPrevStep = () => {
    if (readingIndex - 1 >= 0) {
      setReadingIndex(readingIndex - 1);
    }
  };
  const onChange = (value: number) => {
    const updatedValues = [...values];
    updatedValues.splice(readingIndex, 1, value);
    setValues(updatedValues);
  };
  const onSubmit = async () => {
    setIsPending(true);
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    const params = {
      userId,
      glucose_fasting: values[0],
      glucose_after: values[1],
      cholestrol: values[2],
      weight: values[3],
      date: formatted,
      createdAt: today,
    };
    const response = await fetch(`/api/vitals?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    queryClient.invalidateQueries({ queryKey: ["vitals"] });
    setIsPending(false);
    setReadingIndex(0);
    onOpenChange(false);
  };
  const config = [
    {
      title: "Glucose - Fasting",
      desc: "Blood glucose level",
      min: 80,
      max: 220,
      unit: "mmol/L",
      optimal: 110,
      step: 10,
    },
    {
      title: "Glucose - After food",
      desc: "Blood glucose level",
      min: 80,
      max: 350,
      unit: "mmol/L",
      optimal: 250,
      step: 10,
    },
    {
      title: "Cholestrol",
      desc: "Cholestrol level",
      min: 8,
      max: 22,
      unit: "mg/dL",
      optimal: 12,
      step: 1,
    },
    {
      title: "Weight",
      desc: "Body weight",
      min: 30,
      max: 500,
      unit: "kg",
      optimal: 50,
      step: 1,
    },
  ];
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <Reader
          readingIndex={readingIndex}
          {...config[readingIndex]}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
          reading={values[readingIndex]}
          setReading={onChange}
          disabled={isPending}
        />
      </DrawerContent>
    </Drawer>
  );
}
