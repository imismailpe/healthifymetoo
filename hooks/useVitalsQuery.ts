import { useQuery } from "@tanstack/react-query";

export function useVitalsQuery(userId: string) {
  return useQuery({
    queryKey: ["vitals"],
    enabled: !!userId, // run only when id is available
    queryFn: async () => {
      const result = await fetch(`/api/vitals?userId=${userId}`);
      const json = await result.json();
      return json;
    },
    refetchOnWindowFocus: false,
  });
}
