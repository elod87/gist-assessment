import { TextField } from "@mui/material";
import { useState } from "react";
import { GistSummaryCard } from "../../components/gist-summary-card";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetQuery } from "../../hooks/useGetQuery";
import { GistSummaryModel } from "../../utils/types";

const dataMapFunction = (gists: any): GistSummaryModel[] => {
    return gists.map((gist: any) =>({
        id: gist.id,
        title: Object.keys(gist.files).length ? Object.keys(gist.files)[0] : '-',
        description: gist.description,
        createdAt: new Date(gist.created_at),
        commentCount: gist.comments,
        fileCount: Object.keys(gist.files).length
    } as GistSummaryModel))
};

export const GistList = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: gistsArr, loading } = useGetQuery<GistSummaryModel[]>(
    `https://api.github.com/users/${debouncedSearchValue}/gists`,
    dataMapFunction,
    debouncedSearchValue === ""
  );

  const listReady = searchValue !== "" && gistsArr && gistsArr.length;

  return (
    <div className="container mx-auto flex flex-col">
      <div className="w-full py-10 px-2 flex justify-center">
        <TextField
          label="Github username"
          type="search"
          className="w-full max-w-lg bg-white"
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {loading && <h1 className="italic">loading...</h1>}
        {!loading && !listReady ? <h1 className="italic">No data</h1> : null}
        {!loading && listReady ?
            gistsArr.map((gist, index) => <GistSummaryCard key={index} gist={gist} />) : null}
      </div>
    </div>
  );
};
