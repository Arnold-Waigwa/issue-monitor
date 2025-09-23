import dynamic from "next/dynamic";
import LoadingSkeleton from "../_components/loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: true,
  loading: () => <LoadingSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
