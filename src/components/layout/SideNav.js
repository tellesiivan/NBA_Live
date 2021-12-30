import { NavLink, Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useSelector } from "react-redux";
import "./sass/sideNav.scss";

function SideNav() {
  const team = useSelector((store) => store.userInfo.teamSelected);
  const teamSelected = Object.keys(team).length !== 0;

  return (
    <div className="sideNav">
      <div className="logo">
        <Link to="/home">
          <img
            src="https://warnermediaforbrands.com/wmx/sites/default/files/2021-03/nba-white_2.png"
            alt="logo"
          />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active" exact>
              <HomeOutlinedIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/teams" activeClassName="active">
              <SportsBasketballOutlinedIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" activeClassName="active">
              <CalendarTodayOutlinedIcon />
            </NavLink>
          </li>
          <li>
            <NavLink to="/preferences" activeClassName="active">
              {teamSelected ? (
                <AccountCircleOutlinedIcon />
              ) : (
                <ManageAccountsIcon />
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
