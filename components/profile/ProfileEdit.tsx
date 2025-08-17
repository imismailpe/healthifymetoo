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
import { Input } from "@/components/ui/input";
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
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  city: z.string().optional(),
  gender: z.string(),
  dob: z
    .string({
      error: "Date of birth is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .refine(
      (val) => {
        const dob = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  mobile_number: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: "Mobile number must be exactly 10 digits",
    }),
});

export default function ProfileEdit() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSessionQuery();
  const defaultValues = {
    name: "",
    gender: "m",
    dob: "",
    city: "",
    mobile_number: "",
  };
  const [userData, setUserData] = useState(defaultValues);
  const userId = session?.user?.id || "";

  const userQuery = useUserQuery(userId);
  const queryClient = useQueryClient();
  const fillUser = () => {
    const data = userQuery.data.data[0];
    const values = {
      name: data.name,
      gender: data.gender,
      dob: data.dob,
      city: data.city,
      mobile_number: data.mobile_number,
    };
    form.reset({
      ...values,
    });
    setUserData(values);
  };
  useEffect(() => {
    if (userId && !userQuery.isFetching && userQuery?.data?.data?.length) {
      fillUser();
    }
  }, [userId, userQuery.isFetching]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      setIsPending(true);
      await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ ...values, id: userId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (pathname === "/profile") {
        router.push("/health");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Male</SelectItem>
                    <SelectItem value="f">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type={"date"}
                  placeholder="08/15/1947"
                  {...field}
                  className="w-[180px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Bengaluru" {...field} />
              </FormControl>
              <FormDescription>This is your residing place.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input placeholder="9012345678" {...field} />
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
      <Skeleton className="h-12 w-[180px]" />
      <Skeleton className="h-12 w-[180px]" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
