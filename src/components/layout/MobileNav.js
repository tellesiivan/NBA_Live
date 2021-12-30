import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { NavLink, Link } from "react-router-dom";

function MobileNav(props) {
  const style = props.setStyle ? "mobile-nav" : "mobile-nav mobile-nav-ra";

  return (
    <div className={style}>
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active" exact>
            <HomeRoundedIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/teams" activeClassName="active">
            <SportsBasketballIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" activeClassName="active">
            <CalendarTodayIcon />
          </NavLink>
        </li>
        <li>
          <NavLink to="/preferences" activeClassName="active">
            <SettingsIcon />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
