import { useSelector } from "react-redux";
import { getTeamInfo } from "./Helper";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import TeamGames from "../../loads/TeamGames";
import "./team.scss";

function TeamNext() {
  let content = "";
  const lang = navigator.language;

  const upcomingGames = useSelector((store) => store.userInfo.upcomingGames);
  const teams = useSelector((store) => store.userInfo.teams);
  const status = useSelector((store) => store.userInfo.upcomingGamesStatus);

  const nextFiveGames = upcomingGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);

    const gameDate = game.strTimestamp;

    const dateLocal = new Date(gameDate);
    const isToday = new Date();
    const isYesterday = new Date(Date.now() - 864e5);
    const yesterday = isYesterday.toLocaleDateString(`${lang}`, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
    const today = isToday.toLocaleDateString(`${lang}`, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });

    const date = dateLocal.toLocaleDateString(`${lang}`, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });

    const time = dateLocal.toLocaleTimeString(`${lang}`, {
      hour: "numeric",
      minute: "numeric",
    });

    // due to api update time, it might be a day behind and still show yesterdays game as upcomingGame
    if (date === yesterday) return;

    return (
      <div key={game.idEvent} className="upcomingGame">
        <div className="upcomingGame-team gameTeam">
          <Link to={`/teams/${game.idHomeTeam}`}>
            <img src={homeTeam.teamLogo} alt={homeTeam.teamShort} />
          </Link>
          <span>{homeTeam.teamShort}</span>
        </div>
        <div className="upcomingGame-info">
          <span className="upcomingGame-info-time">{time}</span>
          <span className="upcomingGame-info-date">
            {today === date ? "Today" : date}
          </span>
        </div>
        <div className="upcomingGame-team gameTeam">
          <Link to={`/teams/${game.idAwayTeam}`}>
            <img src={awayTeam.teamLogo} alt="test" />
          </Link>
          <span>{awayTeam.teamShort}</span>
        </div>
      </div>
    );
  });
  // set content based on loading status | not the best way to do it
  if (status === "loading") {
    content = <TeamGames />;
  } else if (status === "done") {
    content = nextFiveGames;
  }

  return (
    <Fragment>
      <span className="label">Upcoming Games</span>
      {content}
    </Fragment>
  );
}

export default TeamNext;
