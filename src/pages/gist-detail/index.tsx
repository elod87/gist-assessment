import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getMaterialFileIcon } from "file-extension-icon-js";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { GistDetailModel, GistFileModel } from "../../utils/types";

const dataMapFunction = (gist: any): GistDetailModel => {
  return {
    id: gist.id,
    title: Object.keys(gist.files).length ? Object.keys(gist.files)[0] : '-',
    description: gist.description,
    createdAt: new Date(gist.created_at),
    commentCount: gist.comments,
    fileCount: Object.keys(gist.files).length,
    owner: {
      login: gist.owner.login,
      avatar_url: gist.owner.avatar_url,
    },
    files: gist.files,
    forks: gist.forks
  } as GistDetailModel
};

export const GistDetail = () => {
  const { gistId } = useParams();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<GistFileModel | null>(null);

  const { data: gist, loading } = useGetQuery<GistDetailModel>(`https://api.github.com/gists/${gistId}`, dataMapFunction);

  const lastThreeForks = gist ? gist.forks.sort((fork1, fork2) => fork2.created_at.getTime() - fork1.created_at.getTime()).slice(0, 3) : [];
  const fileNames = gist && Object.keys(gist.files).length ? Object.keys(gist.files) : [];

  const fileClickHandler = (file: GistFileModel) => {
    setSelectedFile(file);
    setDialogVisible(true);
  };

  const dialogCloseHandler = () => {
    setSelectedFile(null);
    setDialogVisible(false);
  };

  return loading ? (
    <h1>loading...</h1>
  ) : gist ? (
    <div className="container h-screen mx-auto flex flex-col p-2">
      <div className="pt-10 px-2 flex flex-row gap-4">
        <div className="">
          <Avatar alt="owner avatar" src={gist.owner.avatar_url} />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-[#0969DA] mr-1">{gist.owner.login}</span>/
            <span className="text-[#0969DA] font-semibold ml-1">{fileNames.length ? fileNames[0] : "-"}</span>
          </div>
          <div>
            <div className="text-xs text-gray-500">Created: {gist.createdAt.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="py-3 text-sm">
        {gist.description}
      </div>

      <div>
        <h1 className="font-semibold">Latest forks: {lastThreeForks.length === 0 ? '(none)' : ''}</h1>
        <div className="flex flex-col gap-6 flex-wrap m-3">
          {lastThreeForks.map((fork, index) => {
            return (
              <div key={index} className="flex flex-row items-center gap-2">
                <Avatar alt="owner avatar" src={fork.user.avatar_url} />
                <span className="text-[#0969DA] mr-1">{fork.user.login}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex-1">
        <h1 className="font-semibold">Files (click to preview):</h1>
        <div className="flex flex-row gap-6 flex-wrap m-3">
          {fileNames.length ? (
            fileNames.map((filename, index) => {
              const fileDetails = gist.files[filename];
              return (
                <div key={index}>
                  <div className="flex gap-2">
                    <img src={getMaterialFileIcon(fileDetails.filename)} alt="" width="24" />
                    <span className="cursor-pointer text-[#0969DA]" onClick={() => fileClickHandler(fileDetails)}>
                      {fileDetails.filename}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No files found</h1>
          )}
        </div>
      </div>

      <Dialog open={dialogVisible} onClose={dialogCloseHandler} scroll="paper">
        <DialogTitle id="scroll-dialog-title">Preview</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description">
            <ReactMarkdown>{selectedFile ? selectedFile.content : ""}</ReactMarkdown>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogCloseHandler}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
};
