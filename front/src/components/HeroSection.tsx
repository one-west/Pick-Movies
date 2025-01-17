export default function HeroSection() {
  return (
      <section className="bg-cover bg-center h-96"
               style={{backgroundImage: `url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Find your favorite movie</h2>
          <p className="mt-2 text-lg">Explore a world of movies tailored to your taste</p>
          <button className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500">
            Get Started
          </button>
        </div>
      </section>
  );
};
