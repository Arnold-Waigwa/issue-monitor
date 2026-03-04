import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const comments = ["comment1", "comment2", "comment3"];
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
        <ReactMarkdown className="font-bold">comments</ReactMarkdown>
        {comments.map((comment) => (
          <ReactMarkdown key={comment}>{comment}</ReactMarkdown>
        ))}
      </Card>
    </div>
  );
};

export default IssueDetails;
