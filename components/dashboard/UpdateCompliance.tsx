"use client";
import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "@/hooks/useUserQuery";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  wakeup_gap: z.number().min(0.1).max(23),
  workout: z.number().min(0).max(240),
  last_meal_gap: z.number().min(0).max(8),
  sleep: z.number().min(0).max(12),
});
export default function UpdateCompliance({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSessionQuery();
  const userId = session?.user?.id || "";

  const queryClient = useQueryClient();
  const userQuery = useUserQuery(userId);

  const [data, setData] = useState(userQuery.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ ...values, id: userId }),
    });
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    setIsPending(false);
    onOpenChange(false);
  }
  useEffect(() => {
    if (userQuery.isFetched) {
      const data = userQuery.data.data[0];

      const values = {
        wakeup_gap: data.wakeup_gap,
        workout: data.workout,
        last_meal_gap: data.last_meal_gap,
        sleep: data.sleep,
      };
      form.reset({
        ...values,
      });
      setData(values);
    }
  }, [userQuery.isFetched]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>

        {userQuery.isFetched ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="wakeup_gap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wake up</FormLabel>
                    <div className="flex items-center gap-2">
                      <span>I woke up at least</span>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[80px]"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <span>hrs before sunrise</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout</FormLabel>
                    <div className="flex items-center gap-2">
                      <span>I have worked out at least</span>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[80px]"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <span>mins for the day</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_meal_gap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last meal</FormLabel>
                    <div className="flex items-center gap-2">
                      <span>I eat my last meal at least</span>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[80px]"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <span>hrs before going to bed</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last meal</FormLabel>
                    <div className="flex items-center gap-2">
                      <span>I have slept at least</span>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="w-[80px]"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <span>hrs last night</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <div className="flex gap-4 flex-col">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-[180px]" />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
