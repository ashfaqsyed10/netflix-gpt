import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.UpcomingMovies = action.payload;
    },
    addPopularTV: (state, action) => {
      state.popularTV = action.payload;
    },
    addTrendingTV: (state, action) => {
      state.trendingTV = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTrendingMovies, addUpcomingMovies, addPopularTV, addTrendingTV} =
  moviesSlice.actions;

export default moviesSlice.reducer;