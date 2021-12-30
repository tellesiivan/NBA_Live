import { Fragment } from "react";
import { getTeamInfo, eventLiveScore } from "../pages/teamDetails/Helper";
import { useSelector } from "react-redux";

function NotiContent(props) {
  const scoresSetting = useSelector(
    (store) => store.userInfo.settings.hideScores
  );

  let classBoldH = "";
  let classBoldA = "";

  if (+props.info.intHomeScore > +props.info.intAwayScore) {
    classBoldH = "bold";
  } else {
    classBoldH = "";
  }
  if (+props.info.intAwayScore > +props.info.intHomeScore) {
    classBoldA = "bold";
  } else {
    classBoldA = "";
  }

  return (
    <Fragment>
      <div className="notification-team">
        <div className="notification-team-info">
          <img src={props.info.strHomeTeamBadge} alt={props.info.strHomeTeam} />
          <span className={!scoresSetting && classBoldH}>
            {props.info.strHomeTeam}
          </span>
        </div>
        <div className={`notification-team-score ${classBoldH}`}>
          {scoresSetting ? (
            <div className="hide-scores-alt"></div>
          ) : props.info.intHomeScore ? (
            props.info.intHomeScore
          ) : (
            "0"
          )}
        </div>
      </div>
      <div className="notification-team">
        <div className="notification-team-info second-t">
          <img src={props.info.strAwayTeamBadge} alt={props.info.strAwayTeam} />
          <span className={!scoresSetting && classBoldA}>
            {props.info.strAwayTeam}
          </span>
        </div>
        <div className={`notification-team-score ${classBoldA}`}>
          {scoresSetting ? (
            <div className="hide-scores-alt"></div>
          ) : props.info.intAwayScore ? (
            props.info.intAwayScore
          ) : (
            "0"
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default NotiContent;
