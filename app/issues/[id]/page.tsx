import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "../_components/AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import StatusSelect from "../_components/StatusSelect";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const id = params.id;
  const fetchUser = cache((issueId: number) =>
    prisma.issue.findUnique({ where: { id: issueId } }),
  );
  const issues = await fetchUser(parseInt(id));

  if (!issues) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4 mr-2">
        <IssueDetails issue={issues} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issues} />
            <StatusSelect issue={issues} />
            <EditIssueButton issueId={issues.id} />
            <DeleteIssueButton issueId={issues.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default page;

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: issue?.description,
  };
}
