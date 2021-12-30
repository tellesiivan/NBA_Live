import { Fragment, useEffect } from "react";
import "./home.scss";
import LiveSugg from "../teamDetails/Live.js/LiveSugg";
import { Link } from "react-router-dom";
import PastEvents from "../Events/Latest/PastEvents";
import { useSelector } from "react-redux";

function HomeMain() {
  const team = useSelector((store) => store.userInfo.teamSelected);
  const teamSelected = Object.keys(team).length !== 0;

  useEffect(() => {
    // dispatch(fetchTable());
    document.title = `NBA Live`;
  }, []);

  return (
    <Fragment>
      <div className="home_header "></div>
      <div className="home_section">
        <LiveSugg />
      </div>
      <div className="home_section home_dynamic">
        <Link to="/preferences" className="home_dynamic-item hex_1">
          <div>Your Preferences</div>
        </Link>
        <Link to="/events" className="home_dynamic-item hex_2">
          <div>Events</div>
        </Link>
        <Link to="/teams" className="home_dynamic-item hex_3">
          <div>{teamSelected ? "Your Team" : "Select Team"}</div>
        </Link>
      </div>
      <div className="home_section">
        <PastEvents />
      </div>
    </Fragment>
  );
}

export default HomeMain;
