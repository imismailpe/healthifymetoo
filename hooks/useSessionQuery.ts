import { useQuery } from "@tanstack/react-query";

export function useSessionQuery() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json(); // This is the NextAuth session object
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });
}
