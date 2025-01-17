import HeroSection from "../components/HeroSection.tsx";
import SearchSection from "../components/SearchSection.tsx";
import PopularMovies from "../components/PopularMovies.tsx";

export default function Home() {
  return (
      <div>
        <HeroSection/>
        <SearchSection/>
        <PopularMovies/>
      </div>
  );
};
