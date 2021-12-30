import "./team.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpcomingGames,
  fetchPreviousGames,
} from "../../../data/UserInfo/infoActions";
import { eventActions } from "../../../data/UserInfo/eventSlice";
import { useRouteMatch } from "react-router-dom";
import TeamPlayers from "./TeamPlayers";
import TeamNext from "./TeamNext";
import TeamPrevious from "./TeamPrevious";
import LiveEvent from "./Live.js/LiveEvent";
import SeatGeek from "./SeatGeek";
import LiveSugg from "./Live.js/LiveSugg";

function TeamContent(props) {
  let isLive = false;
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const status = useSelector((store) => store.userInfo.playersLoadStatus);
  const UpcomingGamesstatus = useSelector(
    (store) => store.userInfo.upcomingGamesStatus
  );

  const previousGamesStatus = useSelector(
    (store) => store.userInfo.previousGamesStatus
  );
  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const teamID = match.params.teamId;

  if (liveGames) {
    liveGames.map((game) => {
      const verifyHomeTeam = +game.idHomeTeam === +teamID;
      const verifyAwayTeam = +game.idAwayTeam === +teamID;
      if (verifyAwayTeam || verifyHomeTeam) {
        isLive = true;
      }
      return isLive;
    });
  }

  // slide right dash side
  const setActiveRight = useSelector(
    (store) => store.eventReducer.trigger_Actions.showTeamEvents
  );
  console.log();
  function setShowRightHandler() {
    dispatch(eventActions.toggleShowTeamEvents());
  }

  // -----> request team data
  useEffect(() => {
    dispatch(fetchUpcomingGames(props.teamID));
    dispatch(fetchPreviousGames(props.teamID));
    document.title = `${props.teamName}`;
  }, [props.teamID, dispatch, props.teamName]);

  // useEffect(() => {
  //   dispatch(fetchLiveGames());
  //   const interval = setInterval(() => {
  //     dispatch(fetchLiveGames());
  //   }, requestFqncy);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="teamDash">
      <div className="dashLeft">
        <div
          className="dashLeftHead"
          style={{
            backgroundImage: `url(${props.stadiumImg})`,
          }}
        >
          <div className="dashLeftHeadAbs"></div>
          <div className="dashLeftHeadIntro">
            <span>{props.stadiumName}</span>
            <h3>{props.teamName}</h3>
          </div>
          <div className="dashLeftHead-action">
            <button onClick={setShowRightHandler}>
              <span></span> View Team Games
            </button>
          </div>
        </div>

        {isLive && <LiveEvent />}
        {!isLive && liveGames.length >= 1 && <LiveSugg />}
        <SeatGeek />
        {status !== "error" && (
          <div className="dashLeftPlayers">
            <TeamPlayers id={teamID} />
          </div>
        )}

        <div className="dashLeftDesc">
          <p>{props.teamDesc}</p>
        </div>
      </div>
      <div
        className={setActiveRight ? "dashRight active_btnClick" : "dashRight"}
      >
        {UpcomingGamesstatus === "error" ? (
          console.log("unable to load upcoming games")
        ) : (
          <div className="upcomingGames">
            <TeamNext id={props.teamID} />
          </div>
        )}
        {previousGamesStatus === "error" ? (
          console.log("unable to load previous games")
        ) : (
          <div className="previousGames">
            <TeamPrevious />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamContent;
