import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import GameImage from '../../components/UI/GameImage/GameImage';
import FilterSection from '../../components/FilterSection/FilterSection';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import useScreenSize from '../../hooks/useScreenSize';
import LoginStore from '../../store/login.mobx';
import dashboardStore from '../../store/dashboard.mobx';
import './styles.scss';

const Dashboard: React.FC = observer(() => {
  const isMobile = useScreenSize(1024);
  const navigate = useNavigate();
  const {
    logOut,
  } = LoginStore;

  const {
    gameData,
    loader,
    gameGroups,
    gameProviders,
    selectedProviders,
    selectedGroups,
    selectedSorts,
    isMobileView,
    rowCount,
    searchValue,
    getGames,
    GetProvider,
    GetGames,
    handleProviderClick,
    handleGroupClick,
    handleSortClick,
    checkIsMobileView,
    setRowCount,
    handleReset,
    handleSearch,
  } = dashboardStore;

  useEffect(() => {
    getGames();
    GetProvider();
    GetGames();
    checkIsMobileView(isMobile)
  }, []);


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleLogout = () => {
    logOut(navigate)
  };


  return (
    <div className="dashboard-container">
      <Header onLogout={handleLogout} />
      <main className="main-content">
        {isMobileView && (
          <div className={`mobile-view mobile-search-section ${isFilterOpen ? 'add-overlay' : ''}`}>
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search"
              debounceTime={300}
              searchValue={searchValue}
            />
            <button
              className={!isFilterOpen ? "filter-toggle mobile-only" : "d-none"}
              onClick={() => setIsFilterOpen(true)}
            >
              <span className="filter-icon">≡</span> Show filters
            </button>
            <div className={isFilterOpen ? "filter-toggle custom-height mobile-only" : "d-none"}>
              <FilterSection
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                handleChange={setRowCount}
                gameGroups={gameGroups}
                gameProviders={gameProviders}
                handleProviderClick={handleProviderClick}
                selectedProviders={selectedProviders}
                handleGroupClick={handleGroupClick}
                selectedGroups={selectedGroups}
                handleSortClick={handleSortClick}
                selectedSorts={selectedSorts}
                rowCount={rowCount}
                handleReset={handleReset}
                gamesAmount={gameData.length ?? 0}
                handleSearch={handleSearch}
                searchValue={searchValue}
              />
            </div>

            <button
              className={isFilterOpen ? "filter-toggle hide-toggle mobile-only" : "d-none"}
              onClick={() => setIsFilterOpen(false)}
            >
              <span className="filter-icon">≡</span> Hide filters
            </button>
          </div>
        )}
        <div className="content-layout">
          <div className={`games-grid images-per-row-${rowCount}`}>
            {loader && Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="image-placeholder">Loading...</div>
            ))}
            {gameData.length == 0 && !loader ? <p>No Data Available</p> : gameData?.map((data) => (
              <GameImage key={data.id} imageUrl={data.cover} imageName={data.name} loading='lazy' />
            ))}
          </div>
          {!isMobileView && (
            <div className="filter-grid">
              <FilterSection
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                handleChange={setRowCount}
                gameGroups={gameGroups}
                gameProviders={gameProviders}
                handleProviderClick={handleProviderClick}
                selectedProviders={selectedProviders}
                handleGroupClick={handleGroupClick}
                selectedGroups={selectedGroups}
                handleSortClick={handleSortClick}
                selectedSorts={selectedSorts}
                rowCount={rowCount}
                handleReset={handleReset}
                gamesAmount={gameData.length ?? 0}
                handleSearch={handleSearch}
                searchValue={searchValue}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
});

export default Dashboard;