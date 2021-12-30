import { API_URL } from "../Api";
import { eventActions } from "./eventSlice";

export function fetchDateSpecificGames(date) {
  console.log(date);
  return (dispatch) => {
    async function getTeams() {
      dispatch(eventActions.onSelectedDateStatus({ status: "loading" }));
      try {
        const rq = await fetch(`${API_URL}eventsday.php?d=${date}&l=4387`);
        const res = await rq.json();
        if (res.events === null) throw new Error("no events found");
        dispatch(eventActions.onSelectedDateEvents({ events: res.events }));
        dispatch(eventActions.onSelectedDateStatus({ status: "done" }));
      } catch (error) {
        console.log(error.message);
        dispatch(eventActions.onSelectedDateStatus({ status: "error" }));
      }
    }
    getTeams();
  };
}

// fetch past 15 games
export function fetchLast15Games() {
  return (dispatch) => {
    async function getEvents() {
      dispatch(eventActions.last15EventsStatus({ status: "loading" }));
      try {
        const rq = await fetch(`${API_URL}eventspastleague.php?id=4387`);
        const res = await rq.json();
        if (res.events === null) throw new Error("no events found");
        dispatch(eventActions.last15EventsHandler({ lastEvents: res.events }));
        dispatch(eventActions.last15EventsStatus({ status: "done" }));
      } catch (error) {
        console.log(error.message);
        dispatch(eventActions.last15EventsStatus({ status: "error" }));
      }
    }
    getEvents();
  };
}

// fetch past 15 games
export function fetchNext15Games() {
  return (dispatch) => {
    async function getEvents() {
      dispatch(eventActions.next15EventsStatus({ status: "loading" }));
      try {
        const rq = await fetch(`${API_URL}eventsnextleague.php?id=4387`);
        const res = await rq.json();
        if (res.events === null) throw new Error("no events found");
        dispatch(eventActions.next15EventsHandler({ nextEvents: res.events }));
        dispatch(eventActions.next15EventsStatus({ status: "done" }));
      } catch (error) {
        console.log(error.message);
        dispatch(eventActions.next15EventsStatus({ status: "error" }));
      }
    }
    getEvents();
  };
}

// fetch leauge table
export function fetchTable() {
  return (dispatch) => {
    async function getTeams() {
      try {
        const rq = await fetch(`${API_URL}lookuptable.php?l=4387&s=2021-2022`);
        const res = await rq.json();
        if (res.events === null) throw new Error("no events found");
        console.log(rq);
      } catch (error) {
        console.log(error.message);
      }
    }
    getTeams();
  };
}
