import Toggle from "@atlaskit/toggle";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoActions } from "../../../data/UserInfo/infoSlice";

function ScoresSetting() {
  const dispatch = useDispatch();
  const scoresSetting = useSelector(
    (store) => store.userInfo.settings.hideScores
  );
  function toggledHandler() {
    dispatch(infoActions.setHideScores({ hide: !scoresSetting }));
  }

  return (
    <Fragment>
      <Toggle
        id="toggle-default"
        onChange={toggledHandler}
        isChecked={scoresSetting && true}
      />
    </Fragment>
  );
}

export default ScoresSetting;
