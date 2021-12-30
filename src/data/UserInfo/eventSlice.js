import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onDate: {
    events: [],
    status: null,
  },
  events: {
    last15: {
      events: [],
      status: null,
    },
    next15: {
      events: [],
      status: null,
    },
  },
  trigger_Actions: {
    showEvents: false,
    showTeamEvents: false,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    onSelectedDateEvents(state, action) {
      state.onDate.events = action.payload.events;
    },
    onSelectedDateStatus(state, action) {
      state.onDate.status = action.payload.status;
    },
    next15EventsHandler(state, action) {
      state.events.next15.events = action.payload.nextEvents;
    },
    next15EventsStatus(state, action) {
      state.events.next15.status = action.payload.status;
    },
    last15EventsHandler(state, action) {
      state.events.last15.events = action.payload.lastEvents;
    },
    last15EventsStatus(state, action) {
      state.events.last15.status = action.payload.status;
    },
    toggleShowEvents(state) {
      state.trigger_Actions.showEvents = !state.trigger_Actions.showEvents;
    },
    toggleShowTeamEvents(state) {
      state.trigger_Actions.showTeamEvents =
        !state.trigger_Actions.showTeamEvents;
    },
  },
});

export default eventSlice.reducer;
export const eventActions = eventSlice.actions;
