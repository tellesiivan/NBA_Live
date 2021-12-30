import "./preferences.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "@atlaskit/toggle";
import { infoActions } from "../../../data/UserInfo/infoSlice";
import ScoresSetting from "./ScoresSetting";
import UpdateTeam from "./UpdateTeam";
import AddToCalendar from "./AddToCalendar";
import Notifications from "./Notifications";

function Main() {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.userInfo.settings.theme);
  const currentTeam = useSelector((store) => store.userInfo.teamSelected);
  const teams = useSelector((store) => store.userInfo.teams);
  const userSelectedTeam = Object.keys(teams).length !== 0;

  useEffect(() => {
    document.title = `Preferences`;
  }, []);

  function darkModeHandler() {
    dispatch(
      infoActions.setAppTheme({ theme: theme === "dark" ? "light" : "dark" })
    );
  }

  return (
    <div className="preferences">
      <div className="preferences-container">
        <div className="preferences-list">
          <div class="preferences-team">
            <span className="preferences-team-title">Preferences</span>
            {userSelectedTeam && (
              <span className="preferences-team-current">
                {currentTeam.name}
              </span>
            )}
          </div>
          <ul>
            <li>
              <span className="preferences-setting-label">
                <p>Update Team</p>
              </span>
              <div className="preferences-setting-type">
                <UpdateTeam />
              </div>
            </li>
            <li>
              <span className="preferences-setting-label">
                <p>Theme:</p>
                <span>{theme === "dark" ? "Dim" : "Classic"} </span>
              </span>
              <div className="preferences-setting-type">
                <Toggle
                  id="preferences--toggle"
                  onChange={darkModeHandler}
                  isChecked={theme !== "dark" ? true : false}
                />
              </div>
            </li>
            <li>
              <span className="preferences-setting-label">
                <p>Add to Calendar</p>
                <span>
                  A button that enables you to add events to your calendar.
                  Google, Apple, Outlook, and others.
                </span>
              </span>
              <div className="preferences-setting-type">
                <AddToCalendar />
              </div>
            </li>
            <li>
              <span className="preferences-setting-label">
                <p>Hide Scores</p>
              </span>
              <div className="preferences-setting-type">
                <ScoresSetting />
              </div>
            </li>
            <li>
              <span className="preferences-setting-label">
                <p>Allow in-app notifications</p>
                <span>
                  When enabled, you will recieve in app notifications of your
                  favorite team's half-time & final game score.
                </span>
              </span>
              <div className="preferences-setting-type">
                <Notifications />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
