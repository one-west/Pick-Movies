import HeroSection from "../components/HeroSection.tsx";
import SearchSection from "../components/SearchSection.tsx";
import PopularCardMovies from "../components/PopularCardMovies.tsx";

export default function HomePage() {
  return (
      <div>
        <HeroSection/>
        <SearchSection/>
        <PopularCardMovies/>
      </div>
  );
};
