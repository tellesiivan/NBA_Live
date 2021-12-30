import { API_URL } from "../Api";
import { infoActions } from "./infoSlice";

export function fetchTeams() {
  return (dispatch) => {
    dispatch(infoActions.loadStatusHandler({ status: "loading" }));
    async function getTeams() {
      try {
        const rq = await fetch(`${API_URL}Lookup_all_teams.php?id=4387`);
        const res = await rq.json();
        const data = res.teams;
        dispatch(infoActions.loadTeamsHandler({ teams: data }));
        dispatch(infoActions.loadStatusHandler({ status: "done" }));
      } catch (error) {
        dispatch(infoActions.loadStatusHandler({ status: "error" }));
      }
    }
    getTeams();
  };
}

export function fetchTeamPlayers(id) {
  return (dispatch) => {
    async function getPlayers() {
      dispatch(infoActions.statusPlayersHandler({ status: "loading" }));
      try {
        const rq = await fetch(`${API_URL}lookup_all_players.php?id=${id}`);
        const res = await rq.json();
        const data = res.player;
        dispatch(infoActions.loadPlayersHandler({ players: data }));
        dispatch(infoActions.statusPlayersHandler({ status: "done" }));
      } catch (error) {
        dispatch(infoActions.statusPlayersHandler({ status: "error" }));
      }
    }
    getPlayers();
  };
}

export function fetchUpcomingGames(id) {
  return (dispatch) => {
    dispatch(infoActions.statusUGHandler({ status: "loading" }));
    async function getGames() {
      try {
        const rq = await fetch(`${API_URL}eventsnext.php?id=${id}`);
        const res = await rq.json();
        const data = res.events;
        dispatch(infoActions.upcomingGamesHandler({ games: data }));
        dispatch(infoActions.statusUGHandler({ status: "done" }));
      } catch (error) {
        dispatch(infoActions.statusUGHandler({ status: "error" }));
      }
    }
    getGames();
  };
}

export function fetchPreviousGames(id) {
  return (dispatch) => {
    dispatch(infoActions.statusPGHandler({ status: "loading" }));
    async function getGames() {
      try {
        const rq = await fetch(`${API_URL}eventslast.php?id=${id}`);
        const res = await rq.json();
        const data = res.results;
        dispatch(infoActions.previousGamesHandler({ games: data }));
        dispatch(infoActions.statusPGHandler({ status: "done" }));
      } catch (error) {
        dispatch(infoActions.statusPGHandler({ status: "error" }));
      }
    }
    getGames();
  };
}

export function fetchLiveGames() {
  return (dispatch) => {
    dispatch(infoActions.statusLiveGames({ status: "loading" }));
    async function getGames() {
      try {
        const rq = await fetch(
          `https://www.thesportsdb.com/api/v2/json/40130162/livescore.php?l=4387`
        );
        const res = await rq.json();
        const data = res.events;
        dispatch(infoActions.statusLiveGames({ status: "done" }));
        dispatch(infoActions.loadLiveGames({ liveGames: data }));
      } catch (error) {
        console.log("test");
        dispatch(infoActions.statusLiveGames({ status: "error" }));
      }
    }
    getGames();
  };
}
