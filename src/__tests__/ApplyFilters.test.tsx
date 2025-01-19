import { applyFilters } from '../helper/commonFunction';
import { GameTypes, Filters, GroupsTypes } from '../types/dashboard.types';


describe('applyFilters Function', () => {
    // Sample data and groups
    const data: GameTypes[] = [
        {
            id: 1, name: 'Game A', provider: 1, date: '2022-01-01',
            cover: '',
            coverLarge: ''
        },
        {
            id: 2, name: 'Game B', provider: 2, date: '2023-05-15',
            cover: '',
            coverLarge: ''
        },
        {
            id: 3, name: 'Game C', provider: 1, date: '2021-08-10',
            cover: '',
            coverLarge: ''
        },
    ];

    const actualData: GameTypes[] = [
        { id: 1, name: 'Game A', provider: 1, date: '2022-01-01', cover: '', coverLarge: '' },
        { id: 2, name: 'Game B', provider: 2, date: '2023-05-15', cover: '', coverLarge: '' },
        { id: 3, name: 'Game C', provider: 1, date: '2021-08-10', cover: '', coverLarge: '' },
    ];

    const groups: GroupsTypes[] = [
        { id: 101, name: 'Group 1', games: [1, 3] },
        { id: 102, name: 'Group 2', games: [2] },
    ];

    // 1. Search filter test
    it('filters data by search value', () => {
        const filters: Filters = {
            searchValue: 'game',
            selectedProviders: [],
            selectedGroups: [],
            selectedSorts: ''
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual(data);
    });

    // // 2. Provider filter test
    it('filters data by selected providers', () => {
        const filters: Filters = {
            selectedProviders: [1],
            searchValue: '',
            selectedGroups: [],
            selectedSorts: ''
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual([data[0], data[2]]);
    });

    // // 3. Group filter test
    it('filters data by selected groups', () => {
        const filters: Filters = {
            selectedGroups: [101, 102],
            searchValue: '',
            selectedProviders: [],
            selectedSorts: ''
        };
        const result = applyFilters(data, filters, groups);
        expect(result).toEqual(data);
    });

    // 4. Sort filter test - A-Z
    it('sorts data by A-Z', () => {
        const filters: Filters = {
            selectedSorts: 'A-Z',
            searchValue: '',
            selectedProviders: [],
            selectedGroups: []
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual([data[0], data[1], data[2]]);
    });

    // // 5. Sort filter test - Z-A
    it('sorts data by Z-A', () => {
        const filters: Filters = {
            selectedSorts: 'Z-A',
            searchValue: '',
            selectedProviders: [],
            selectedGroups: []
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual([actualData[2], actualData[1], actualData[0]]);
    });

    // // 6. Sort filter test - Newest
    it('sorts data by newest', () => {

        const filters: Filters = {
            selectedSorts: 'Newest',
            searchValue: '',
            selectedProviders: [],
            selectedGroups: []
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual([actualData[1], actualData[0], actualData[2]]);
    });

    // 7. Sort filter test - Default
    it('sorts data by default', () => {
        const filters: Filters = {
            selectedSorts: 'default',
            searchValue: '',
            selectedProviders: [],
            selectedGroups: []
        };
        const result = applyFilters(data, filters, []);
        expect(result).toEqual(actualData);
    });

    // 8. Check multiple filter 
    it('sorts data by default', () => {
        const filters: Filters = {
            selectedSorts: 'Z-A',
            searchValue: 'Game',
            selectedProviders: [1],
            selectedGroups: [101]
        };

        const result = applyFilters(data, filters, groups);
        expect(result).toEqual([actualData[2], actualData[0]]);
    });
});
