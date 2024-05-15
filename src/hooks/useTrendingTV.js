import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingTV } from "../utils/moviesSlice";

const useTrendingTV = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getTrendingTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingTV(json.results));
  };

  useEffect(() => {
    getTrendingTV();
  }, []);
};

export default useTrendingTV;