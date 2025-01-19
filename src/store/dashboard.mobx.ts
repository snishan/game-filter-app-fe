import { action, makeObservable, observable } from "mobx"
import { Filters, GameTypes, GroupsTypes, ProviderTypes } from "../types/dashboard.types";
import { GetGames, GetGroups, GetProvider } from "../services/dashboard.service";
import { ResponseType } from "../types/login.types";
import { applyFilters } from "../helper/commonFunction";

class DashboardStore {
    gameData: GameTypes[] = [];
    gameDataCopy: GameTypes[] = [];
    gameProviders: ProviderTypes[] = [];
    gameGroups: GroupsTypes[] = [];
    selectedProviders: number[] = [];
    selectedGroups: number[] = [];
    selectedSorts: string = 'default';
    isMobileView: boolean = false;
    rowCount: string = '4';
    searchValue: string = '';
    loader: boolean = false;
    error: string = '';


    constructor() {
        makeObservable(this, {
            gameData: observable,
            gameDataCopy: observable,
            loader: observable,
            error: observable,
            selectedProviders: observable,
            selectedGroups: observable,
            selectedSorts: observable,
            rowCount: observable,
            searchValue: observable,
            getGames: action,
            GetProvider: action,
            GetGames: action,
            handleProviderClick: action,
            handleGroupClick: action,
            handleSortClick: action,
            setRowCount: action,
            handleReset: action,
            handleSearch: action,
            applyFilters: action,
        });

    }
    getGames = async () => {
        this.loader = true;
        const response: ResponseType = await GetGames()

        if (response.status == 'success') {
            this.gameData = response.data as unknown as GameTypes[]
            this.gameDataCopy = response.data as unknown as GameTypes[]
            this.loader = false;
        } else {
            this.loader = false;
        }
    }
    GetProvider = async () => {
        this.loader = true;
        const response: ResponseType<ProviderTypes[]> = await GetProvider()

        if (response.status == 'success') {
            this.gameProviders = response.data as unknown as ProviderTypes[]
            this.loader = false;
        } else {
            this.loader = false;
        }
    }
    GetGames = async () => {
        this.loader = true;
        const response: ResponseType<GroupsTypes[]> = await GetGroups()
        if (response.status == 'success') {
            this.gameGroups = response.data as unknown as GroupsTypes[]
            this.loader = false;
        } else {
            this.loader = false;
        }
    }
    handleProviderClick = (id: number) => {
        if (this.selectedProviders.includes(id)) {
            this.selectedProviders = this.selectedProviders.filter((providerId) => providerId !== id)
        } else {
            this.selectedProviders = [...this.selectedProviders, id]
        }
        this.applyFilters();
    }
    handleGroupClick = (id: number) => {
        if (this.selectedGroups.includes(id)) {
            this.selectedGroups = this.selectedGroups.filter((gameId) => gameId !== id)
        } else {
            this.selectedGroups = [...this.selectedGroups, id]
        }
        this.applyFilters();
    }
    handleSortClick = (value: string) => {
        if (this.selectedSorts === value) {
            this.selectedSorts = 'default';
        } else {
            this.selectedSorts = value;
        }
        this.applyFilters();

    }
    checkIsMobileView = (value: boolean) => {
        this.isMobileView = value;
        this.rowCount = value ? '2' : '4'
    }
    setRowCount = (value: string) => {
        this.rowCount = value
    }
    handleReset = () => {
        this.selectedGroups = [];
        this.selectedProviders = [];
        this.selectedSorts = 'default';
        this.rowCount = !this.isMobileView ? '4' : '2';
        this.searchValue = '';
        this.gameData = this.gameDataCopy;
        this.applyFilters();
    }
    handleSearch = (value: string) => {
        this.searchValue = value;
        this.applyFilters();
    }
    applyFilters = () => {

        const filters: Filters = {
            searchValue: this.searchValue,
            selectedProviders: this.selectedProviders,
            selectedGroups: this.selectedGroups,
            selectedSorts: this.selectedSorts,
        };

        this.gameData = applyFilters(this.gameDataCopy, filters, this.gameGroups);
    };
}

const dashboardStore = new DashboardStore();
export default dashboardStore;