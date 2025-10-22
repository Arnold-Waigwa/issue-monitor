"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<User[]>("/api/users/");
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
