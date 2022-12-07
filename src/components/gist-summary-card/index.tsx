import React from "react";
import { GistSummaryModel } from "../../utils/types";
import FilesIcon from "../../assets/img/files.svg";
import CommentsIcon from "../../assets/img/comments.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  gist: GistSummaryModel;
}

export const GistSummaryCard: React.FC<Props> = ({ gist }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/gist/${gist.id}`);
  };

  return (
    <div
      className="w-[305px] max-h-[320px] relative flex-col p-2.5 bg-white
        border-solid border-[1px] border-lightGrey rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="font-semibold mt-3">{gist.title}</div>
      <div className="max-two-lines h-10 text-sm text-gray-700 italic">{gist.description}</div>
      <div className="absolute right-2 top-1 text-xs text-gray-500">{gist.createdAt.toLocaleString()}</div>
      <div className="flex justify-between mt-5">
        <div className="flex items-center gap-1">
          <img src={FilesIcon} alt="files" />
          <span className="text-sm">{gist.fileCount} files</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={CommentsIcon} alt="comments" />
          <span className="text-sm">{gist.commentCount} comments</span>
        </div>
      </div>
    </div>
  );
};
