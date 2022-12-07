import { useParams } from "react-router-dom";

export const GistDetail = () => {
  const { gistId } = useParams();

  return <div>GistDetail {gistId}</div>;
};
