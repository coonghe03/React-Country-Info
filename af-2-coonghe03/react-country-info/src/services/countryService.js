import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

//Function to fetch all countries

export const fetchAllCountries = async () => {
    try{
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error){
        console.error('Error fetching countries:',error);
        return[];
    }
};


//Function to fetch countries by name

export const fetchCountryByName = async (name) => {
    try{
        const response = await axios.get(`${API_URL}/name/${name}`);
        return response.data;
    } catch (error){
        console.error(`Error fetching country with name ${name}:`, error);
        return[];
    }
}

//Function to fetch countries by region

export const fetchCountriesByRegion = async (region) => {
    try{
        const response = await axios.get(`${API_URL}/region/${region}:`);
        return response.data;
    } catch(error){
        console.error(`Error fetching countries in ${region}:`, error);
        return[];
    }
}