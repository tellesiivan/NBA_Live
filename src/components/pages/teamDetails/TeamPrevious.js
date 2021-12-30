import { useSelector } from "react-redux";
import "./team.scss";
import { getTeamInfo } from "./Helper";
import TeamGames from "../../loads/TeamGames";

function TeamPrevious() {
  let content = "";

  const previousGames = useSelector((store) => store.userInfo.previousGames);
  const teams = useSelector((store) => store.userInfo.teams);
  const status = useSelector((store) => store.userInfo.previousGamesStatus);

  const previousFiveGames = previousGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);

    const lang = navigator.language;
    const dateLocal = new Date(game.strTimestamp);
    const date = dateLocal.toLocaleDateString(`${lang}`, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    let classBoldH = "";
    let classBoldA = "";

    if (+game.intHomeScore > +game.intAwayScore) {
      classBoldH = "previous-right bold";
    } else {
      classBoldH = "previous-right";
    }
    if (+game.intAwayScore > +game.intHomeScore) {
      classBoldA = "previous-right bold";
    } else {
      classBoldA = "previous-right";
    }

    return (
      <div key={game.idEvent} className="previous-item">
        <div className="previous">
          <div className="previous-info">
            <div className="previous-info-score">
              <div className="previous-team gameTeam">
                <div className="previous-left">
                  <img src={homeTeam.teamLogo} alt={homeTeam.teamShort} />
                  <span>{homeTeam.teamShort}</span>
                </div>
                <div className={classBoldH}>{game.intHomeScore}</div>
              </div>
              <div className="previous-team gameTeam">
                <div className="previous-left">
                  <img src={awayTeam.teamLogo} alt="test" />
                  <span>{awayTeam.teamShort}</span>
                </div>
                <div className={classBoldA}>{game.intAwayScore}</div>
              </div>
            </div>
            <div className="previous-info-status">
              <span>{game.strStatus}</span>
            </div>
          </div>
        </div>
        <div className="previous-details">Played on {date}</div>
      </div>
    );
  });
  // set content based on loading status | not the best way to do it
  if (status === "loading") {
    content = <TeamGames />;
  } else if (status === "done") {
    content = previousFiveGames;
  }
  return (
    <div>
      <span className="label">Previous Games</span>
      {content}
    </div>
  );
}

export default TeamPrevious;
