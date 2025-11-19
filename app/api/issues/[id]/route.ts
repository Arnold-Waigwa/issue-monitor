import authOptions from "@/app/auth/AuthOptions";
import { PatchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  //const session = await getServerSession(authOptions);
  //if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = PatchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedUserId, title, description } = body;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }

  const { id } = await params; // Await the params Promise

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 400 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedUserId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
