import { useQuery } from "@tanstack/react-query";

export function useVitalsTSQuery(userId: string) {
  return useQuery({
    queryKey: ["vitals_timeseries"],
    enabled: !!userId, // run only when id is available
    queryFn: async () => {
      const result = await fetch(`/api/vitals_timeseries?userId=${userId}`);
      const json = await result.json();
      return json;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
