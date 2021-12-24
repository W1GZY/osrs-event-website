import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";

interface PublicPlayerInfo{
    username: string,
    id: number,
    combatLevel: number,
    totalLevel: number
}

interface PlayersStore {
    players: PublicPlayerInfo[];
    getPlayers: () => void;
}

const fetchPlayers = async (): Promise<PublicPlayerInfo[]> => {
    console.log("==== Fetching Players =====")
    const res = await fetch("http://localhost:6501/api-unauth/players");
    const jsonRes = await res.json();

    const players = jsonRes['players'] as PublicPlayerInfo[];
    return players;
};

export const usePlayersStore = create<PlayersStore>(
    devtools((set: SetState<PlayersStore>, get: GetState<PlayersStore>) => ({
        players: [],
        getPlayers: async () => {
            const players = await fetchPlayers();
            console.log(players);
            set({ players: players });
        },
    }))
);
