import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issues) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <Box>
        <IssueDetails issue={issues} />
      </Box>
      <Box>
        <EditIssueButton issueId={issues.id} />
      </Box>
    </Grid>
  );
};

export default page;
