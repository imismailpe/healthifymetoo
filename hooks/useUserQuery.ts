import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ["user"],
    enabled: !!userId, // run only when id is available
    queryFn: async () => {
      const result = await fetch(`/api/user?id=${userId}`);
      const json = await result.json();
      return json;
    },
    refetchOnWindowFocus: false,
  });
}
