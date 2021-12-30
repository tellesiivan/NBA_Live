import "../events.scss";
import { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";
import { fetchDateSpecificGames } from "../../../../data/UserInfo/eventsActions";
import Events from "./Events";
import TeamGames from "../../../loads/TeamGames";
import ErrorMessage from "./ErrorMessage";
const lang = navigator.language;

function SpecificDate() {
  const scrollRef = useRef(null);

  const dispatch = useDispatch();
  const eventsStatus = useSelector((store) => store.eventReducer.onDate.status);
  const [value, onChange] = useState(new Date());
  const [changedDate, setChangedDate] = useState("");

  const setActiveRight = useSelector(
    (store) => store.eventReducer.trigger_Actions.showEvents
  );

  useEffect(() => {
    if (setActiveRight && scrollRef !== null) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [setActiveRight]);

  useEffect(() => {
    const date =
      value.getFullYear() +
      "-" +
      (value.getMonth() + 1) + // index starts at 0 so add 1
      "-" +
      (value.getDate() + 1);

    const headerDate = value.toLocaleDateString(`${lang}`, {
      year: "numeric",
      month: "short",
      weekday: "short",
      day: "numeric",
    });
    dispatch(fetchDateSpecificGames(date));
    setChangedDate(headerDate);
  }, [value, dispatch]);

  let content = "";

  if (eventsStatus === "error") {
    content = <ErrorMessage />;
  } else if (eventsStatus === "loading") {
    content = <TeamGames />;
  } else {
    content = <Events />;
  }

  return (
    <div className="specific-container" ref={scrollRef}>
      <p className="specific-header">
        Games happening on <span>{changedDate}</span>
      </p>
      <Calendar onChange={onChange} value={value} className="calendar" />
      {content}
    </div>
  );
}

export default SpecificDate;
