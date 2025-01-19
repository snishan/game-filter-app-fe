import { Filters, GameTypes, GroupsTypes } from "../types/dashboard.types";


export const applyFilters = (
    data: GameTypes[],
    filters: Filters,
    groups: GroupsTypes[]
): GameTypes[] => {
    let filteredData = data;

    // 1. This is Search filter
    if (filters.searchValue) {
        filteredData = filteredData.filter((item) =>
            item.name.toLowerCase().includes(filters.searchValue.toLowerCase())
        );
    }

    // 2. This is for provider filter
    if (filters.selectedProviders.length > 0) {
        filteredData = filteredData.filter((item) =>
            filters.selectedProviders.includes(item.provider!)
        );
    }

    // 3. This is for group filter
    if (filters.selectedGroups.length > 0) {

        // Get all gameIds from the selected groups
        const selectedGameIds = filters.selectedGroups.flatMap((groupId) => {
            const group = groups.find((g) => g.id === groupId);
            return group ? group.games : [];
        });

        // Filter games base on selected groups
        filteredData = filteredData.filter((item) =>
            selectedGameIds.includes(item.id)
        );
    }

    // 4. This is for sort
    if (filters.selectedSorts) {
        filteredData = sortData(filteredData, filters.selectedSorts);
    }

    return filteredData;
};


const sortData = (data: GameTypes[], sorts: string): GameTypes[] => {

    return data.sort((a, b) => {
        if (sorts === 'A-Z') {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
        } else if (sorts === 'Z-A') {
            if (a.name > b.name) return -1; // Sort Z-A
            if (a.name < b.name) return 1;
            return 0;
        } else if (sorts === 'Newest') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sorts === 'default') {
            return a.id - b.id;
        }
        return 0;
    });
};