import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import  useUpcomingMovies  from "../hooks/useUpcomingMovies";
import usePopularTV from "../hooks/usePopularTV";
import useTrendingTV from "../hooks/useTrendingTV";
import Header from "./Header";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();
  usePopularTV();
  useTrendingTV();

  

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
     
    </div>
  );
};
export default Browse;