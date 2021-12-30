import { Link } from "react-router-dom";
const lang = navigator.language;

export function getTeamInfo(teamID, allTeams) {
  let imgSrc = "";
  allTeams.map((team) => {
    if (team.idTeam === teamID) {
      imgSrc = {
        teamLogo: team.strTeamBadge,
        teamShort: team.strTeamShort,
        arena: team.strStadium,
      };
    }
    return imgSrc;
  });
  return imgSrc;
}
export function liveItem(game, homeTeam, awayTeam) {
  let classBoldH = "";
  let classBoldA = "";

  if (+game.intHomeScore > +game.intAwayScore) {
    classBoldH = "bold";
  } else {
    classBoldH = "";
  }
  if (+game.intAwayScore > +game.intHomeScore) {
    classBoldA = "bold";
  } else {
    classBoldA = "";
  }

  return (
    <div className="live-event-item" key={game.idEvent}>
      {game.strStatus === "FT" || game.strStatus === "AOT" ? (
        <div class="live-indicator">Final</div>
      ) : (
        <div class="live-indicator">
          <span>
            {game.strStatus === "NS" ? "Starting Soon" : `${game.strStatus} - `}
            {game.strStatus !== "NS" && `${game.strProgress}:00`}
          </span>
          <div class="live-indicator__bar__mask">
            <div class="live-indicator__bar__wrap">
              <div class="live-indicator__bar"></div>
            </div>
          </div>
        </div>
      )}
      <div className="live">
        <div className="live-left live-team">
          <img src={homeTeam.teamLogo} alt="test" />
          <span className={classBoldH}>{homeTeam.teamShort}</span>
        </div>
        <div className="live-center">
          <span className={classBoldH}>
            {game.intHomeScore === null ? "0" : game.intHomeScore}
          </span>
          <span className="live-center-sep">-</span>
          <span className={classBoldA}>
            {game.intAwayScore === null ? "0" : game.intAwayScore}
          </span>
        </div>
        <div className="live-right live-team">
          <img src={awayTeam.teamLogo} alt="test" />
          <span className={classBoldA}>{awayTeam.teamShort}</span>
        </div>
      </div>
    </div>
  );
}
export function eventLiveScore(game, homeTeam, awayTeam, optClass, hideScores) {
  let classBoldH = "";
  let classBoldA = "";

  if (+game.intHomeScore > +game.intAwayScore) {
    classBoldH = "bold";
  } else {
    classBoldH = "";
  }
  if (+game.intAwayScore > +game.intHomeScore) {
    classBoldA = "bold";
  } else {
    classBoldA = "";
  }

  const progress = game.strProgress;

  return (
    <div className="live-event-item live-score-item" key={game.idEvent}>
      {game.strStatus === "FT" || game.strStatus === "AOT" ? (
        <div class="live-indicator">Final</div>
      ) : (
        <div class="live-indicator">
          <span>
            {game.strStatus === "NS" ? "Starting Soon" : `${game.strStatus} `}
            {game.strStatus !== "NS" && `${progress}'`}
          </span>
          <div class="live-indicator__bar__mask">
            <div class="live-indicator__bar__wrap">
              <div class="live-indicator__bar"></div>
            </div>
          </div>
        </div>
      )}
      <div className="live">
        <div className="live-left live-score-team">
          <img src={homeTeam.teamLogo} alt="test" />
          <span className={!hideScores && classBoldH}>
            {homeTeam.teamShort}
          </span>
        </div>
        {hideScores ? (
          <div className="hide-scores"></div>
        ) : (
          <div className="live-score-center">
            <span className={!hideScores && classBoldH}>
              {game.intHomeScore === null ? "0" : game.intHomeScore}
            </span>
            <span className="live-score-center-sep">-</span>
            <span className={!hideScores && classBoldA}>
              {game.intAwayScore === null ? "0" : game.intAwayScore}
            </span>
          </div>
        )}

        <div className="live-right live-score-team">
          <img src={awayTeam.teamLogo} alt="test" />
          <span className={!hideScores && classBoldA}>
            {awayTeam.teamShort}
          </span>
        </div>
      </div>
    </div>
  );
}

/// opt layout

export function eventLayoutOpt(game, homeTeam, awayTeam, optClass, hideScores) {
  const lang = navigator.language;
  const dateLocal = new Date(game.strTimestamp);
  const date = dateLocal.toLocaleDateString(`${lang}`, {
    weekday: "short",
    month: "short",
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

  // get colors from team logos

  const classType = `previous-item ${optClass}`;

  return (
    <div key={game.idEvent} className={classType}>
      <div className="previous">
        <div className="previous-info">
          <div className="previous-info-score">
            <div className="previous-team gameTeam">
              <div className="previous-left">
                <img src={homeTeam.teamLogo} alt={homeTeam.teamShort} />
                <span className={!hideScores && classBoldH}>
                  {homeTeam.teamShort}
                </span>
              </div>
              <div className={classBoldH}>
                {hideScores ? (
                  <div className="hide-scores-alt"></div>
                ) : (
                  game.intHomeScore
                )}
              </div>
            </div>
            <div className="previous-team gameTeam">
              <div className="previous-left">
                <img src={awayTeam.teamLogo} alt="test" />
                <span className={!hideScores && classBoldA}>
                  {awayTeam.teamShort}
                </span>
              </div>
              <div className={classBoldA}>
                {hideScores ? (
                  <div className="hide-scores-alt"></div>
                ) : (
                  game.intAwayScore
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="previous-details">{date}</div>
    </div>
  );
}

/// opt layout

export function eventLayoutSche(game, homeTeam, awayTeam, optClass) {
  const gameDate = game.strTimestamp;
  const dateLocal = new Date(gameDate);
  const isToday = new Date();
  const isYesterday = new Date(Date.now() - 864e5);
  const yesterday = isYesterday.toLocaleDateString(`${lang}`, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const today = isToday.toLocaleDateString(`${lang}`, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const date = dateLocal.toLocaleDateString(`${lang}`, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const time = dateLocal.toLocaleTimeString(`${lang}`, {
    hour: "numeric",
    minute: "numeric",
  });

  // due to api update time, it might be a day behind and still show yesterdays game as upcomingGame, here is a simple solution

  let dateShownContent = "";
  if (date === yesterday) {
    dateShownContent = "Yesterday";
  } else if (date === today) {
    dateShownContent = "Today";
  } else {
    dateShownContent = date;
  }

  const classType = `upcomingGame ${optClass}`;

  return (
    <div key={game.idEvent} className={classType}>
      <div className="upcomingGame-team gameTeam">
        <Link to={`/teams/${game.idHomeTeam}`}>
          <img src={homeTeam.teamLogo} alt={homeTeam.teamShort} />
        </Link>
        <span>{homeTeam.teamShort}</span>
      </div>
      <div className="upcomingGame-info">
        <span className="upcomingGame-info-time">{time}</span>
        <span className="upcomingGame-info-date">{dateShownContent}</span>
      </div>
      <div className="upcomingGame-team gameTeam">
        <Link to={`/teams/${game.idAwayTeam}`}>
          <img src={awayTeam.teamLogo} alt="test" />
        </Link>
        <span>{awayTeam.teamShort}</span>
      </div>
    </div>
  );
}
