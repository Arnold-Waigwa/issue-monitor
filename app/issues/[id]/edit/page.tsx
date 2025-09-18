import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditPage;
