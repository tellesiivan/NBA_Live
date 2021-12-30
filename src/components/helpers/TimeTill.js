import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function TimeTill(props) {
  const currentEvent = props.details.idEvent;
  const upcomingGames = useSelector((store) => store.userInfo.upcomingGames);
  const [event, setEvent] = useState(null);
  let eventX = "";

  if (upcomingGames) {
    upcomingGames.map((game) => {
      if (game.idEvent === currentEvent) {
        return (eventX = game);
      }
      return eventX;
    });
  }

  const lang = navigator.language;
  const date = new Date(eventX.strTimestamp);

  const time = date.toLocaleTimeString(`${lang}`, {
    hour: "numeric",
    minute: "numeric",
  });
  console.log(date / 10000);
  return (
    <div>
      <Countdown date={Date.now() + date / 10000} />
    </div>
  );
}

export default TimeTill;
