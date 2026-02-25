"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";

const AssigneeSelectFilter = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const changeUser = (assignee: string) => {
    const params = new URLSearchParams(searchParams);
    if (assignee) params.set("assignee", assignee);
    else params.delete("assignee");
    const query = "?" + params.toString();
    router.push(`/issues/list${query}`);
  };

  return (
    <Select.Root onValueChange={changeUser} disabled={!users?.length}>
      <Select.Trigger placeholder="Choose assignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Available Users</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelectFilter;
