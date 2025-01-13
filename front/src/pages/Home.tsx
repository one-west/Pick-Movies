import {Header} from "../components/Header.tsx";
import {HeroSection} from "../components/HeroSection.tsx";
import {SearchSection} from "../components/SearchSection.tsx";
import {Footer} from "../components/Footer.tsx";
import {PopularMovies} from "../components/PopularMovies.tsx";

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header/>
        <HeroSection/>
        <SearchSection/>
        <PopularMovies/>
        <Footer/>
      </div>
  );
};
