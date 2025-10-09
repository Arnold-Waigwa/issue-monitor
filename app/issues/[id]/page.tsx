import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getSession } from "next-auth/react";
import authOptions from "@/app/auth/AuthOptions";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const session = await getSession(authOptions);
  const { id } = await params;
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issues) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issues} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <EditIssueButton issueId={issues.id} />
            <DeleteIssueButton issueId={issues.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default page;
