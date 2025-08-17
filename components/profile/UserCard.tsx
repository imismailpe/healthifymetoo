import { useSessionQuery } from "@/hooks/useSessionQuery";
import { useUserQuery } from "@/hooks/useUserQuery";

import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function UserCard() {
  const { data: session } = useSessionQuery();
  const userQuery = useUserQuery(session?.user?.id);
  const userData = userQuery?.data?.data[0];
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          {userData.name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{userData.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {userData.email}
        </span>
      </div>
    </div>
  );
}
