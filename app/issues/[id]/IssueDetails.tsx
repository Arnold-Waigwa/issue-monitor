import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = async ({ issue }: { issue: Issue }) => {
  const comments = await prisma.comments.findMany({
    where: {
      issueId: issue.id,
    },
    include: {
      user: true, // include user info (name, image, etc.)
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="5" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Card className="mt-3">
        <Heading size="3" mb="2">
          Comments
        </Heading>
        {comments.length === 0 ? (
          <Text color="gray">No comments yet.</Text>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} my="2">
              <Flex justify="between" mb="1">
                <Text size="2" weight="bold">
                  {comment.user?.name ?? comment.user?.email ?? "Unknown"}
                </Text>
                <Text size="1" color="gray">
                  {comment.createdAt.toDateString()}
                </Text>
              </Flex>
              {comment.text}
            </Card>
          ))
        )}
      </Card>
    </div>
  );
};

export default IssueDetails;
