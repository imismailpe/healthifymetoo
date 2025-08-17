import { useQuery } from "@tanstack/react-query";

export function useHealthQuery(userId: string) {
  return useQuery({
    queryKey: ["health"],
    enabled: !!userId, // run only when id is available
    queryFn: async () => {
      const result = await fetch(`/api/health?userId=${userId}`);
      const json = await result.json();
      return json;
    },
    refetchOnWindowFocus: false,
  });
}
