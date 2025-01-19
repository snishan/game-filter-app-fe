import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import SearchIcon from '../../../assets/icons/search_icon.svg'
import { debounce } from './debounce';
import './styles.scss';

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
  className?: string;
  searchValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search',
  debounceTime = 300,
  className = '',
  searchValue,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(searchValue ?? '')
  }, [searchValue])


  const debouncedSearch = useCallback(
    debounce((searchTerm: unknown) => {
      onSearch(searchTerm as string);
    }, debounceTime),
    [onSearch, debounceTime]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className={`search-wrapper ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    </div>
  );
};

export default SearchInput;