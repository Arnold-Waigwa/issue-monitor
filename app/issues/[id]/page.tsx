import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/auth/AuthOptions";
import AssigneeSelect from "../_components/AssigneeSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issues) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4 mr-2">
        <IssueDetails issue={issues} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueButton issueId={issues.id} />
            <DeleteIssueButton issueId={issues.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default page;
