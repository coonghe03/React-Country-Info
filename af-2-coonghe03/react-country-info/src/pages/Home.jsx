import React, { useState, useEffect } from "react";
import { fetchAllCountries } from "../services/countryService";
import CountryList from "../components/CountryList";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [originalCountries, setOriginalCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await fetchAllCountries();
      setCountries(countriesData);
      setOriginalCountries(countriesData);
    };

    getCountries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Countries Information
      </h1>

      {/* Country List */}
      <CountryList countries={countries} />
    </div>
  );
};

export default Home;
