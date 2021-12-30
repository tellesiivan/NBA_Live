import { createSlice } from "@reduxjs/toolkit";

let initial = "";

if (window.localStorage.getItem("state")) {
  initial = JSON.parse(window.localStorage.getItem("state"));
} else {
  initial = {
    settings: {
      theme: "dark",
      hideScores: false,
      addToCalendar: false,
      notifications: {
        allow: false,
        previousQ: "",
        previousE: "",
      },
    },
    teamSelected: {},
    teams: [],
    teamLoadStatus: null,
    players: [],
    playersLoadStatus: null,
    upcomingGames: [],
    upcomingGamesStatus: null,
    previousGames: [],
    previousGamesStatus: null,
    changeTeam: false,
    live: {
      games: {
        all: [],
        status: null,
      },
      details: [],
    },
  };
}

function setLocalStorage(state) {
  window.localStorage.setItem("state", JSON.stringify(state));
}

const infoSlice = createSlice({
  name: "info",
  initialState: initial,
  reducers: {
    userTeamHandler(state, action) {
      state.teamSelected = action.payload.teamSelected;
      setLocalStorage(state);
    },
    loadTeamsHandler(state, action) {
      state.teams = action.payload.teams;
      setLocalStorage(state);
    },
    loadStatusHandler(state, action) {
      state.teamLoadStatus = action.payload.status;
      setLocalStorage(state);
    },
    loadPlayersHandler(state, action) {
      state.players = action.payload.players;
      setLocalStorage(state);
    },
    statusPlayersHandler(state, action) {
      state.playersLoadStatus = action.payload.status;
      setLocalStorage(state);
    },
    upcomingGamesHandler(state, action) {
      state.upcomingGames = action.payload.games;
      setLocalStorage(state);
    },
    statusUGHandler(state, action) {
      state.upcomingGamesStatus = action.payload.status;
      setLocalStorage(state);
    },
    previousGamesHandler(state, action) {
      state.previousGames = action.payload.games;
      setLocalStorage(state);
    },
    statusPGHandler(state, action) {
      state.previousGamesStatus = action.payload.status;
      setLocalStorage(state);
    },
    changeTeamHandler(state, action) {
      state.changeTeam = action.payload.change;
      setLocalStorage(state);
    },
    loadLiveGames(state, action) {
      state.live.games.all = action.payload.liveGames;
      setLocalStorage(state);
    },
    statusLiveGames(state, action) {
      state.live.games.status = action.payload.status;
      setLocalStorage(state);
    },
    loadLiveDetails(state, action) {
      state.live.details = action.payload.details;
      setLocalStorage(state);
    },
    setAppTheme(state, action) {
      state.settings.theme = action.payload.theme;
      setLocalStorage(state);
    },
    setHideScores(state, action) {
      state.settings.hideScores = action.payload.hide;
      setLocalStorage(state);
    },
    setAddToCalendar(state, action) {
      state.settings.addToCalendar = action.payload.calendarOpt;
      setLocalStorage(state);
    },
    setNotifications(state, action) {
      state.settings.notifications.allow = action.payload.opted;
      setLocalStorage(state);
    },
    setPreviousQ(state, action) {
      state.settings.notifications.previousQ = action.payload.quater;
      setLocalStorage(state);
    },
    setPreviousE(state, action) {
      state.settings.notifications.previousE = action.payload.event;
      setLocalStorage(state);
    },
  },
});

export default infoSlice.reducer;
export const infoActions = infoSlice.actions;
