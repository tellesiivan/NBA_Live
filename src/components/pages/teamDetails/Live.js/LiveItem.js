import React from "react";

function LiveItem(props) {
  return (
    <div className="live-event-item" key={props.id}>
      {props.status === "FT" || props.status === "AOT" ? (
        <div class="live-indicator">Final</div>
      ) : (
        <div class="live-indicator">
          <span>
            {props.status === "NS" ? "Starting Soon" : `${props.status} - `}
            {props.status !== "NS" && `${props.progress}'`}
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
          <img src={props.homeTeamLogo} alt="test" />
          <span>{props.homeShort}</span>
        </div>
        <div className="live-center">
          <span className={props.homeBold}>
            {props.homeScore === null ? "0" : props.homeScore}
          </span>
          <span className="live-center-sep">-</span>
          <span className={props.classBoldA}>
            {props.awayScore === null ? "0" : props.awayScore}
          </span>
        </div>
        <div className="live-right live-team">
          <img src={props.awayTeamLogo} alt="test" />
          <span>{props.awayShort}</span>
        </div>
      </div>
    </div>
  );
}

export default LiveItem;
