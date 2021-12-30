import Toggle from "@atlaskit/toggle";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoActions } from "../../../data/UserInfo/infoSlice";

function AddToCalendar() {
  const dispatch = useDispatch();
  const addToCalendar = useSelector(
    (store) => store.userInfo.settings.addToCalendar
  );

  function toggledHandler() {
    dispatch(infoActions.setAddToCalendar({ calendarOpt: !addToCalendar }));
  }

  return (
    <Fragment>
      <Toggle
        id="toggle-default"
        onChange={toggledHandler}
        isChecked={addToCalendar && true}
      />
    </Fragment>
  );
}

export default AddToCalendar;
