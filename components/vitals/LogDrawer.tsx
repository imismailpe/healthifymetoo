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
  const defaultValues = [120, 80, 15, 110, 220, 50];
  const [values, setValues] = useState(defaultValues);
  const queryClient = useQueryClient();
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";
  const [isPending, setIsPending] = useState(false);

  const onNextStep = () => {
    if (readingIndex + 1 < 6) {
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
      bp_systolic: values[0],
      bp_diastolic: values[1],
      cholestrol: values[2],
      glucose_fasting: values[3],
      glucose_after: values[4],
      weight: values[5],
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
  const config =
    readingIndex === 0
      ? {
          title: "Systolic pressure",
          desc: "Blood pressure",
          min: 80,
          max: 220,
          unit: "mmHG",
          optimal: 120,
          step: 10,
        }
      : readingIndex === 1
      ? {
          title: "Diatolic pressure",
          desc: "Blood pressure",
          min: 50,
          max: 120,
          unit: "mmHG",
          optimal: 80,
          step: 10,
        }
      : readingIndex === 2
      ? {
          title: "Cholestrol",
          desc: "",
          min: 8,
          max: 22,
          unit: "mg/dL",
          optimal: 12,
          step: 1,
        }
      : readingIndex === 3
      ? {
          title: "Glucose - fasting",
          desc: "Blood glucose level",
          min: 80,
          max: 220,
          unit: "mmol/L",
          optimal: 110,
          step: 10,
        }
      : readingIndex === 4
      ? {
          title: "Glucose - after food",
          desc: "Blood glucose level",
          min: 80,
          max: 350,
          unit: "mmol/L",
          optimal: 250,
          step: 10,
        }
      : {
          title: "Weight",
          desc: "Body weight",
          min: 30,
          max: 500,
          unit: "kg",
          optimal: 50,
          step: 1,
        };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <Reader
          readingIndex={readingIndex}
          {...config}
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
