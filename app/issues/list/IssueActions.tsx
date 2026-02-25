import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import AssigneeSelectFilter from "./AssigneeSelectFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <AssigneeSelectFilter />
      <Button>
        <Link href="/issues/new">new</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
