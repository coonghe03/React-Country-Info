import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CountryDetails = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
        const data = await res.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryDetails();
  }, [cca3]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
            <div className="flex justify-center">
              <div className="w-48 h-32 bg-gray-300 rounded mb-6"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-lg text-red-500 font-medium">
            Country not found
          </p>
        </div>
      </div>
    );
  }

  const latlng = country.latlng || [0, 0]; // fallback to avoid crash

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-indigo-600 to-indigo-800 py-3 rounded-lg mb-6">
            {country.name.common}
          </h1>
          <div className="flex flex-col items-center">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-64 h-40 object-cover rounded-lg mb-6 shadow-sm"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital ? country.capital[0] : "N/A"}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages || {}).join(", ")}
              </p>
              <p className="text-lg text-gray-700 col-span-1 sm:col-span-2">
                <span className="font-semibold">Currency:</span>{" "}
                {Object.values(country.currencies || {})
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
            </div>

            {/* 🌍 World Map Location */}
            <div className="w-full h-[400px] mt-10 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Country Location"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${latlng[1] - 5}%2C${latlng[0] - 5}%2C${latlng[1] + 5}%2C${latlng[0] + 5}&layer=mapnik&marker=${latlng[0]}%2C${latlng[1]}`}
                className="w-full h-full border-none"
                allowFullScreen
              ></iframe>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Back to Countries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
