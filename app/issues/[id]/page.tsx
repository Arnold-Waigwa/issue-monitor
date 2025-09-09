import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import delay from "delay";
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
      <p>{issues?.title}</p>
      <p>{issues?.description}</p>
      <p>{issues?.status}</p>
      <p>{issues?.createdAt.toDateString()}</p>
    </div>
  );
};

export default page;
