import Toggle from "@atlaskit/toggle";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoActions } from "../../../data/UserInfo/infoSlice";

function Notifications() {
  const dispatch = useDispatch();
  const opted = useSelector(
    (store) => store.userInfo.settings.notifications.allow
  );

  function toggledHandler() {
    dispatch(infoActions.setNotifications({ opted: !opted }));
  }
  return (
    <Fragment>
      <Toggle
        id="toggle-default"
        onChange={toggledHandler}
        isChecked={opted && true}
      />
    </Fragment>
  );
}

export default Notifications;
