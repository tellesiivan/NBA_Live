import { useSelector } from "react-redux";
import { getTeamInfo } from "../../teamDetails/Helper";
import AddToCalendar from "@culturehq/add-to-calendar";
import "@culturehq/add-to-calendar/dist/styles.css";

function EventItem(props) {
  
  const teams = useSelector((store) => store.userInfo.teams);
  const addToCalendar = useSelector(
    (store) => store.userInfo.settings.addToCalendar
  );
  let lang = navigator.language;

  // date stuff
  const dateLocal = new Date(props.eventInfo.date);
  const time = dateLocal.toLocaleTimeString(`${lang}`, {
    hour: "numeric",
    minute: "numeric",
  });
  const startsAt = dateLocal.toLocaleTimeString(`${lang}`, {
    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    year: "numeric",
    day: "numeric",
  });

  const formatEnd = new Date(dateLocal.setHours(dateLocal.getHours() + 3));
  const endsAt = formatEnd.toLocaleTimeString(`${lang}`, {
    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    year: "numeric",
    day: "numeric",
  });

  // team logos
  const homeTeam = getTeamInfo(props.eventInfo.homeTeamId, teams);
 
  const awayTeam = getTeamInfo(props.eventInfo.awayTeamId, teams);

  // add to calendar opt
  const event = {
    name: `${props.eventInfo.homeTeam} @ ${props.eventInfo.awayTeam}`,
    details: `Watch the ${props.eventInfo.homeTeam} take on ${props.eventInfo.awayTeam} at ${time}`,
    location: homeTeam.arena,
    startsAt,
    endsAt,
  };

  
  const downloadfileName = `${homeTeam.teamShort}_${awayTeam.teamShort}`;

  return (
    <div className="onDate-item">
      <div className="onDate-item-top">
        <div className="onDate-item-time">
          <span>{time}</span>
        </div>
        <div className="onDate-item-teams">
          <div className="onDate-item-teams-row">
            <img src={awayTeam.teamLogo} alt={awayTeam.teamShort} />
            <span>{awayTeam.teamShort}</span>
          </div>
          <div className="onDate-item-teams-center">at</div>
          <div className="onDate-item-teams-row">
            <img src={homeTeam.teamLogo} alt={homeTeam.teamShort} />
            <span>{homeTeam.teamShort}</span>
          </div>
        </div>
      </div>
      <div className="onDate-item-actions">
        {addToCalendar && (
          <AddToCalendar
            event={event}
            children=""
            filename={downloadfileName}
          />
        )}
      </div>
    </div>
  );
}

export default EventItem;
