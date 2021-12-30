import { Fragment, useState } from "react";
import "../../index.scss";
import { useSelector, useDispatch } from "react-redux";
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";
import Headroom from "react-headroom";
import Notification from "../helpers/Notification";

import { eventActions } from "../../data/UserInfo/eventSlice";

function Layout(props) {
  const dispatch = useDispatch();
  const setModal = useSelector(
    (store) => store.eventReducer.trigger_Actions.showEvents
  );
  const setModalTeam = useSelector(
    (store) => store.eventReducer.trigger_Actions.showTeamEvents
  );

  const [hide, setHide] = useState(true);
  // -----> will come back here to better handle modal events <--- Could be improved
  function hideEventsHandler() {
    dispatch(eventActions.toggleShowEvents());
  }
  function hideTeamEventsHandler() {
    dispatch(eventActions.toggleShowTeamEvents());
  }

  return (
    <Fragment>
      <Notification />

      <div
        className={setModal ? "modal modal_active" : "modal"}
        onClick={hideEventsHandler}
      ></div>
      <div
        className={setModalTeam ? "modal modal_active" : "modal"}
        onClick={hideTeamEventsHandler}
      ></div>
      <div className="flex-bottom">
        {(!setModal || !setModalTeam) && <MobileNav setStyle={hide} />}
        <SideNav />

        <div className="main">{props.children}</div>
      </div>
    </Fragment>
  );
}

export default Layout;
