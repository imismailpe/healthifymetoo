"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useSessionQuery } from "@/hooks/useSessionQuery";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserQuery } from "@/hooks/useUserQuery";
import { Checkbox } from "../ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useHealthQuery } from "@/hooks/useHealthQuery";

const conditions = [
  {
    id: "diabetes",
    label: "Diabetes",
  },
  {
    id: "hypertension",
    label: "Hypertension",
  },
  {
    id: "cardiac_issues",
    label: "Cardiac issues",
  },
  {
    id: "hyperthyrodism",
    label: "Hyperthyrodism",
  },
  {
    id: "hypothyroidism",
    label: "Hypothyroidism",
  },
] as const;

const formSchema = z.object({
  activity_level: z.string(),
  conditions: z.array(z.string()),
  height: z.number(),
});

export default function HealthEdit() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSessionQuery();
  const defaultValues = {
    activity_level: "Moderate",
    conditions: [],
    height: 150,
  };
  const [userData, setUserData] = useState(defaultValues);
  const userId = session?.user?.id || "";

  const userQuery = useUserQuery(userId);
  const queryClient = useQueryClient();

  const healthQuery = useHealthQuery(userId);

  const fillUser = () => {
    const data = healthQuery.data?.data[0];
    const values = {
      activity_level: data?.activity_level || "Moderate",
      conditions: data?.conditions || [],
      height: data?.height,
    };
    form.reset({
      ...values,
    });
    setUserData(values);
  };
  useEffect(() => {
    if (userId && healthQuery.isFetched) {
      fillUser();
    }
  }, [userId, healthQuery.isFetched]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });
  const mutation = useMutation({
    mutationKey: ["health"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      setIsPending(true);
      await fetch("/api/health", {
        method: "POST",
        body: JSON.stringify({ ...values, userId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health"] });
      if (pathname === "/health") {
        router.push("/dashboard");
      }
      setIsPending(false);
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return userQuery.isFetched ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="activity_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Level</FormLabel>
              <FormDescription>
                How active are you in a typical day?
              </FormDescription>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Moderate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Extreme">Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conditions"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Health Condition</FormLabel>
              <FormDescription>
                Select the health conditions you already have:
              </FormDescription>

              {conditions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="conditions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cms)</FormLabel>
              <FormDescription>How tall are you?</FormDescription>
              <FormControl>
                <Input
                  type="number"
                  placeholder="150"
                  {...field}
                  className="w-[80px]"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
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
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-[180px]" />
      <Skeleton className="h-12 w-[180px]" />
    </div>
  );
}
