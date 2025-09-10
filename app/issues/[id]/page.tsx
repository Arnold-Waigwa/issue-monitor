import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

//calling the issues with Id
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issues) notFound();
  await delay(2000);
  return (
    <div>
      <Heading>{issues?.title}</Heading>
      <Flex gap="5" my="2">
        <IssueStatusBadge status={issues.status} />
        <Text>{issues?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-3">
        <ReactMarkdown>{issues?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default page;
