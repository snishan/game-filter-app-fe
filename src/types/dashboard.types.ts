
export interface GameTypes {
    id: number;
    name: string,
    provider: number,
    cover: string,
    coverLarge: string,
    date: string,
}

export interface ProviderTypes {
    id: number,
    name: string,
    logo: string,
}

export interface GroupsTypes {
    id: number,
    name: string,
    games: number[],
}


export type Filters = {
    searchValue: string;
    selectedProviders: number[];
    selectedGroups: number[];
    selectedSorts: string;
};
