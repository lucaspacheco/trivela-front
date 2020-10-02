import create from 'zustand';

export default create((set, get) => ({
  leagues: [],
  teams: [],

  addLeagueToCart: (league) => set({ leagues: [...get().leagues, league] }),
  addTeamsToCart: (teams) => set({ teams }),

  removeLeagueFromCart: (league) =>
    set({
      leagues: [...get().leagues.filter((item) => item.id !== league.id)],
    }),
  removeTeamFromCart: (team) =>
    set({
      teams: [...get().teams.filter((item) => item.id !== team.id)],
    }),
}));
