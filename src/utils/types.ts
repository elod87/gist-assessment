export interface GistSummaryModel {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  fileCount: number;
  commentCount: number;
}

export interface GistFileModel {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  content: string;
}

interface GistForkModel {
    url: string,
    created_at: Date,
    user: {
        login: string,
        avatar_url: string
    }
}

export interface GistDetailModel extends GistSummaryModel {
    owner: {
        login: string,
        avatar_url: string,
    },
    files: {
        [key: string]: GistFileModel;
    },
    forks: GistForkModel[]
}
