import "./live.scss";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { liveItem, getTeamInfo } from "../Helper";

function LiveEvent(props) {
  let item = " ";

  const match = useRouteMatch();
  const currentTeam = match.params.teamId;
  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const status = useSelector((store) => store.userInfo.live.games.status);
  const teams = useSelector((store) => store.userInfo.teams);

  liveGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);
    const verifyHomeTeam = +game.idHomeTeam === +currentTeam;
    const verifyAwayTeam = +game.idAwayTeam === +currentTeam;

    if (verifyAwayTeam || verifyHomeTeam) {
      item = liveItem(game, homeTeam, awayTeam);
    }
  });

  // if (status === "loading") {
  //     content = "loading";
  //   } else
  if (status === "error") return;
  return (
    <Fragment>
      <div className="live-event">
        {status === "error" ? "oops! unable to load live data" : item}
      </div>
    </Fragment>
  );
}

export default LiveEvent;
