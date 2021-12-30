import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./events.scss";
import LiveScores from "./LiveScores";

import SpecificDate from "./gameONdate/SpecificDate";
import Header from "./Header";
import PastEvents from "./Latest/PastEvents";
import SelectTeam from "./SelectTeam";
import PlayersContainer from "../../loads/PlayersContainer";
import UpcomingEvents from "./Next/UpcomingEvents";
import SelectedTeamNext from "./SelectedTeamContent/SelectedTeamNext";
import { eventActions } from "../../../data/UserInfo/eventSlice";

function EventsMain() {
  const scrollRef = useRef(null);

  const dispatch = useDispatch();

  const setActiveRight = useSelector(
    (store) => store.eventReducer.trigger_Actions.showEvents
  );

  const last15Status = useSelector(
    (store) => store.eventReducer.events.last15.status
  );
  const last15Events = useSelector(
    (store) => store.eventReducer.events.last15.events
  );
  const selectedTeam = useSelector((store) => store.userInfo.teamSelected);
  const noTeamSelected = Object.keys(selectedTeam).length === 0;

  if (setActiveRight && scrollRef !== null) {
    setTimeout(() => {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [1000]); // small touch to showcase smoother scrolling
  }

  function hideEventsHandler() {
    dispatch(eventActions.toggleShowEvents());
  }

  useEffect(() => {
    // dispatch(fetchTable());
    document.title = `NBA Scores, Schedules & More!`;
  }, []);
  return (
    <div className="events">
      {/*  add !live full height */}
      <div className="events-center">
        <div className="events-center-left">
          <div className="events-top sticky">
            <LiveScores />
          </div>
          <Header />

          <div className="events-content">
            {last15Status === "loading" && last15Events ? (
              <PlayersContainer />
            ) : (
              <PastEvents />
            )}
            {noTeamSelected ? <SelectTeam /> : <SelectedTeamNext />}

            <UpcomingEvents />
          </div>
        </div>

        <div
          ref={scrollRef}
          className={
            setActiveRight
              ? "events-center-right active_btnClick"
              : "events-center-right"
          }
        >
          <SpecificDate />
        </div>
      </div>
    </div>
  );
}

export default EventsMain;
