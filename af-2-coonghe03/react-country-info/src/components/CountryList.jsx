import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCountries(term, region);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    filterCountries(searchTerm, selectedRegion);
  };

  const filterCountries = (searchTerm, region) => {
    let filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (region !== "All") {
      filtered = filtered.filter((country) => country.region === region);
    }
    setFilteredCountries(filtered);
  };

  const handleCardClick = (cca3) => {
    navigate(`/country/${cca3}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white bg-gradient-to-r from-indigo-600 to-indigo-800 py-4 rounded-lg mb-4">
          Explore Countries
        </h1>

        {/* 3D Real World Globe */}
        <div className="flex justify-center mb-8">
          <iframe
            src="https://earth3dmap.com/embed/"
            title="3D World"
            className="w-full h-[400px] rounded-lg shadow-md"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
          <select
            value={region}
            onChange={handleRegionChange}
            className="w-full sm:w-1/4 px-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.cca3}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleCardClick(country.cca3)}
                >
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      {country.name.common}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Region:</span>{" "}
                      {country.region}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Capital:</span>{" "}
                      {country.capital ? country.capital[0] : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Population:</span>{" "}
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-red-500 font-medium">
                No countries found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
