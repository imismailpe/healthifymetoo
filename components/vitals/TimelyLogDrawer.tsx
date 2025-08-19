"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useState } from "react";
import Reader from "./Reader";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { useQueryClient } from "@tanstack/react-query";

export function TimelyLogDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [readingIndex, setReadingIndex] = useState(0);
  const defaultValues = [120, 80, 72];
  const [values, setValues] = useState(defaultValues);
  const queryClient = useQueryClient();
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";
  const [isPending, setIsPending] = useState(false);

  const onNextStep = () => {
    if (readingIndex + 1 < 3) {
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
    const params = {
      userId,
      bp_systolic: values[0],
      bp_diastolic: values[1],
      heart_rate: values[2],
    };
    const response = await fetch("/api/vitals_timeseries", {
      method: "POST",
      body: JSON.stringify(params),
    });
    queryClient.invalidateQueries({ queryKey: ["vitals_timeseries"] });
    setIsPending(false);
    setReadingIndex(0);
    onOpenChange(false);
  };
  const config = [
    {
      title: "Systolic pressure",
      desc: "Blood pressure",
      min: 80,
      max: 220,
      unit: "mmHG",
      optimal: 120,
      step: 10,
    },
    {
      title: "Diatolic pressure",
      desc: "Blood pressure",
      min: 50,
      max: 120,
      unit: "mmHG",
      optimal: 80,
      step: 10,
    },
    {
      title: "Heart Rate",
      desc: "Heart pulse rate",
      min: 50,
      max: 90,
      unit: "bpm",
      optimal: 72,
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
