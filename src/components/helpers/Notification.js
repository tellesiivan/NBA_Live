import "./notifications.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoActions } from "../../data/UserInfo/infoSlice";
import NotiContent from "./NotiContent";
import TimeTill from "./TimeTill";

function Notification() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let currentLive = false;
  const currentTeam = useSelector((store) => store.userInfo.teamSelected);
  const liveGames = useSelector((store) => store.userInfo.live.games.all);

  const opted = useSelector(
    (store) => store.userInfo.settings.notifications.allow
  );

  const previousQ = useSelector(
    (store) => store.userInfo.settings.notifications.previousQ
  );
  const previousE = useSelector(
    (store) => store.userInfo.settings.notifications.previousE
  );

  const team = useSelector((store) => store.userInfo.teamSelected);
  const teamIsSelected = Object.keys(team).length !== 0;

  const filterOne = opted && teamIsSelected;

  let content = "";

  if (liveGames) {
    liveGames.map((game) => {
      const verifyHomeTeam = +game.idHomeTeam === +currentTeam.id;
      const verifyAwayTeam = +game.idAwayTeam === +currentTeam.id;
      if (verifyAwayTeam || verifyHomeTeam) {
        content = game;
        currentLive = true;
      }
      return content;
    });
  }
  console.log(content);
  useEffect(() => {
    const quaters = ["HT", "FT"];
    quaters.forEach((qt) => {
      if (content.strStatus === qt) {
        if (previousE === "") {
          dispatch(
            infoActions.setPreviousQ({
              quater: qt,
            })
          );
          dispatch(
            infoActions.setPreviousE({
              event: content.idEvent,
            })
          );
        }

        if (previousE === content.idEvent && previousQ === qt) return;

        setTimeout(() => {
          setShow(true);
          dispatch(
            infoActions.setPreviousQ({
              quater: qt,
            })
          );
          dispatch(
            infoActions.setPreviousE({
              event: content.idEvent,
            })
          );
        }, [2000]);
      }
    });
  }, [content, dispatch, currentTeam, previousQ, previousE]);

  const userOptedIn =
    filterOne && currentLive && show
      ? "notification"
      : "notification opted-out";

  function closeNotification() {
    setShow(false); // set dispatch use redux instead
  }

  return (
    <div className={userOptedIn}>
      <div className="notification-inner">
        <div className="notification-top">
          <div className="notification-label">
            <div className="notification-label-left">
              <h4>Team Notification</h4>
              <span>
                {content.strStatus === "FT" || content.strStatus === "AOT"
                  ? "Final"
                  : content.strStatus}
              </span>
            </div>
          </div>
          <div className="notification-close" onClick={closeNotification}>
            <span>close</span>
          </div>
        </div>

        <div className="notification-info">
          <NotiContent info={content} />
        </div>
      </div>
    </div>
  );
}

export default Notification;
