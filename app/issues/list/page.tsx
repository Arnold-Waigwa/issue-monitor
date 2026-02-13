import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnValues, issueQuery } from "./IssueTable";
import { Metadata } from "next";
import PageNumberSelection from "./PageNumberSelection";

interface Props {
  searchParams: issueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;

  const sortOrder = searchParams.sortOrder === "desc" ? "desc" : "asc";

  const orderBy = columnValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sortOrder }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const count = await prisma.issue.count({
    where: { status: searchParams.status },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="between">
        <Pagination pageSize={pageSize} itemCount={count} currentPage={page} />
        <PageNumberSelection />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Description of issue Tracker",
};
