import { useSelector } from "react-redux";
import "../events.scss";
import EventItem from "./EventItem";

function Events() {
  const events = useSelector((store) => store.eventReducer.onDate.events);

  return (
    <div className="onDate-container">
      {events.map((event) => {
   
        return (
          <EventItem
            key={event.idEvent}
            eventInfo={{
              date: event.strTimestamp,
              homeTeam: event.strHomeTeam,
              homeTeamId: event.idHomeTeam,
              awayTeam: event.strAwayTeam,
              awayTeamId: event.idAwayTeam,
            }}
          />
        );
      })}
    </div>
  );
}

export default Events;
