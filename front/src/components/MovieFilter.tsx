import React from "react";

interface MovieFilterProps {
  onFilterChange: (filter: { genre?: string; year?: string }) => void;
}

export default function MovieFilter({ onFilterChange }: MovieFilterProps) {

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ genre: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ year: e.target.value });
  };

  return (
      <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter Movies</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Genre</label>
          <select
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Year</label>
          <input
              type="number"
              placeholder="Enter year"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              onChange={handleYearChange}
          />
        </div>
      </div>
  );
}
