import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

//calling the issues with Id
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issues) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box>
        <Heading>{issues?.title}</Heading>
        <Flex gap="5" my="2">
          <IssueStatusBadge status={issues.status} />
          <Text>{issues?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-3">
          <ReactMarkdown>{issues?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issues.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default page;
