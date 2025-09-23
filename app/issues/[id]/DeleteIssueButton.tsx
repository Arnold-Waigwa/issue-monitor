import { Button } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <TrashIcon />
      Delete
    </Button>
  );
};

export default DeleteIssueButton;
