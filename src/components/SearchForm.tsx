import React, { useState, FormEvent } from 'react';

type SearchType = 'aircraft' | 'airline';

interface SearchFormProps {
  onSearch: (airline: string, searchTerm: string, type: SearchType) => void;
}

const airlines = [
  { code: '', name: 'All Airlines' },
  { code: 'DAL', name: 'Delta Air Lines' },
  { code: 'UAL', name: 'United Airlines' },
  { code: 'AAL', name: 'American Airlines' },
  { code: 'SWA', name: 'Southwest Airlines' },
  { code: 'ETD', name: 'Etihad Airways' },
  { code: 'UAE', name: 'Emirates' },
  { code: 'ETH', name: 'Ethiopian Airlines' },
  { code: 'AFR', name: 'Air France' },
  { code: 'KLM', name: 'KLM Royal Dutch Airlines' },
  { code: 'BAW', name: 'British Airways' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'QTR', name: 'Qatar Airways' },
  { code: 'SIA', name: 'Singapore Airlines' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<SearchType>('aircraft');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAirline, setSelectedAirline] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(selectedAirline, searchTerm, searchType);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchType = e.target.value as SearchType;
    setSearchType(newSearchType);
    if (newSearchType === 'aircraft') {
      setSelectedAirline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="flex-grow sm:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="aircraft">Search by Aircraft Type</option>
          <option value="airline">Search by Airline</option>
        </select>
        {searchType === 'aircraft' && (
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="flex-grow sm:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {airlines.map((airline) => (
              <option key={airline.code} value={airline.code}>
                {airline.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Enter ${searchType === 'aircraft' ? 'aircraft type' : 'airline name'}...`}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;