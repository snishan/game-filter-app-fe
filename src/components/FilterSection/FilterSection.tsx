import React from "react";
import ResetButton from "../UI/ResetButton/ResetButton";
import SearchInput from "../UI/SearchInput/SearchInput";
import './styles.scss'

import { GroupsTypes, ProviderTypes } from "../../types/dashboard.types";

interface FilterProps {
    isOpen: boolean;
    defaultValue?: number;
    gameGroups: GroupsTypes[];
    gameProviders: ProviderTypes[];
    rowCount: string;
    selectedProviders: number[];
    selectedGroups: number[];
    selectedSorts: string;
    gamesAmount: number,
    searchValue: string,
    onClose: () => void;
    handleChange: (value: string) => void;
    handleProviderClick: (value: number) => void;
    handleGroupClick: (value: number) => void;
    handleSortClick: (value: string) => void;
    handleReset: () => void;
    handleSearch: (value: string) => void;
}

const sortList = ['A-Z', 'Z-A', 'Newest']


const FilterSection: React.FC<FilterProps> = ({
    isOpen,
    gameGroups,
    gameProviders,
    selectedProviders,
    selectedGroups,
    selectedSorts,
    rowCount,
    gamesAmount,
    searchValue,
    onClose,
    handleChange,
    handleProviderClick,
    handleGroupClick,
    handleSortClick,
    handleReset,
    handleSearch,
}) => {

    return (
        <div className={`filter-section ${isOpen ? 'active' : ''}`}>
            <div className="filter-content">
                <div className="search-section">
                    <SearchInput
                        onSearch={(e) => handleSearch(e)}
                        placeholder="Search"
                        debounceTime={300}
                        searchValue={searchValue}
                    />
                </div>
                <div className="filter-group">
                    <p className="filter-name">Providers</p>
                    <div className="filter-tags">
                        {gameProviders.length == 0 ? <p>No Providers Available</p> : gameProviders?.map((data) => {
                            return <span key={data.id} onClick={() => handleProviderClick(data.id)} className={`value-name ${selectedProviders.includes(data.id) ? "highlighted value-name" : "value-name"}`}>{data.name}</span>
                        })}
                    </div>
                </div>
                <div className="filter-group">
                    <p className="filter-name">Game groups</p>
                    <div className="filter-tags">
                        {gameGroups.length == 0 ? <p>No Groups Available</p> : gameGroups?.map((data) => {
                            return <span key={data.id} onClick={() => handleGroupClick(data.id)} className={`value-name ${selectedGroups.includes(data.id) ? "highlighted value-name" : "value-name"}`}>{data.name}</span>
                        })}
                    </div>
                </div>
                <div className="filter-group">
                    <p className="filter-name">Sorting</p>
                    <div className="filter-tags">
                        {sortList.map((data) => {
                            return <span onClick={() => handleSortClick(data)} className={`value-name ${selectedSorts.includes(data) ? "highlighted value-name" : "value-name"}`} key={data}>{data}</span>
                        })}
                    </div>
                </div>
                <div className="filter-group columns-section">
                    <p className="filter-name">Columns</p>
                    <div className="slider-track-container">
                        <div className={`slider-track active-number-${rowCount}`} />
                        <div className="slider-marks">
                            {[2, 3, 4].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => handleChange(value.toString())}
                                    className={`slider-button 
                                        ${Number(rowCount) === 4 ? 'active' : ''} 
                                        ${Number(rowCount) === 3 && value !== 4 ? 'active' : ''} 
                                        ${Number(rowCount) === 2 && (value == 2) ? 'active' : ''} `
                                    }
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="filter-group reset-section">
                    <p className="filter-name">Games amount : {gamesAmount} </p>
                    <ResetButton className='filter-reset-button' label="Reset" onClick={handleReset} />
                </div>
            </div>
            <div className="filter-overlay mobile-only" onClick={onClose}></div>
        </div>
    );
};

export default FilterSection;