import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GistSummaryCard } from "../../components/gist-summary-card";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetQuery } from "../../hooks/useGetQuery";
import { setUsername, uiParamsSelector } from "../../redux/uiParamsSlice";
import { GistSummaryModel } from "../../utils/types";

const dataMapFunction = (gists: any): GistSummaryModel[] => {
  return gists.map(
    (gist: any) =>
      ({
        id: gist.id,
        title: Object.keys(gist.files).length ? Object.keys(gist.files)[0] : "-",
        description: gist.description,
        createdAt: new Date(gist.created_at),
        commentCount: gist.comments,
        fileCount: Object.keys(gist.files).length,
      } as GistSummaryModel)
  );
};

export const GistList = () => {
  const { username } = useSelector(uiParamsSelector);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState(username);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setUsername(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);

  const {
    data: gistsArr,
    loading,
    error,
  } = useGetQuery<GistSummaryModel[]>(`https://api.github.com/users/${username}/gists`, dataMapFunction, username === "");

  const listReady = searchValue !== "" && gistsArr && gistsArr.length;

  return (
    <div className="container mx-auto flex flex-col">
      <div className="w-full py-10 px-2 flex justify-center">
        <TextField
          label="Github username"
          type="search"
          className="w-full max-w-lg bg-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {error ? (
          <h1 className="italic text-red-600">{error}</h1>
        ) : (
          <>
            {loading ? <h1 className="italic">loading...</h1> : null}
            {!loading && !listReady && !error ? <h1 className="italic">No data</h1> : null}
            {!loading && listReady ? gistsArr.map((gist, index) => <GistSummaryCard key={index} gist={gist} />) : null}
          </>
        )}
      </div>
    </div>
  );
};
