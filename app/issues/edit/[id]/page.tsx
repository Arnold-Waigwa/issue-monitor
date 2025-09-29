import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: Promise<{ id: string }>; // Changed from { id: string } to Promise<{ id: string }>
}

const EditPage = async ({ params }: Props) => {
  const { id } = await params; // Await the params Promise

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditPage;
