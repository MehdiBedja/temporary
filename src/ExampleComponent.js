import React, { useState, useEffect } from 'react';
import ApiService from './ApiService'; // Adjust the path as needed

const ExampleComponent = () => {
  const [data, setData] = useState({ years: [] });
  const [showYearsDropdown, setShowYearsDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showNumbersDropdown, setShowNumbersDropdown] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(''); // Initialize with an empty string
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await ApiService.fetchFirstData('/years');
        console.log('Fetched data:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchDataAsync();
  }, []);

  const handleYearSelect = async (year) => {
    setSelectedYear(year);
    setShowNumbersDropdown(false);
    try {
      const numbersResponse = await ApiService.fetchSecondData(`/${year}/`);
      console.log('Fetched numbers:', numbersResponse);
      setNumbers(numbersResponse.number ?? []);
      setShowNumbersDropdown(true);
    } catch (error) {
      console.error('Error fetching numbers:', error);
      // Handle errors as needed
    }
  };

  const handleOpenPDF = () => {
    if (selectedYear && selectedNumber) {
      const url = `http://localhost:8000/data_collection/journals/open-pdf/${selectedYear}/${selectedNumber}/`;
      window.location.href = url;
    } else {
      // Handle the case where year or number is not selected
      console.error('Year and number must be selected to open PDF.');
    }
  };

  return (
    <div>
      <button onClick={() => setShowYearsDropdown(!showYearsDropdown)}>Show Years</button>
      {showYearsDropdown && data && data.years?.length > 0 && (
        <select value={selectedYear} onChange={(e) => handleYearSelect(e.target.value)}>
          <option value="">Select Year</option>
          {data.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
      <button onClick={() => setShowNumbersDropdown(!showNumbersDropdown)}>Show Numbers</button>
      {showNumbersDropdown && (
        <select value={selectedNumber} onChange={(e) => setSelectedNumber(e.target.value)}>
          <option value="">Select Number</option>
          {numbers.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleOpenPDF}>Open PDF</button>
    </div>
  );
};

export default ExampleComponent;
