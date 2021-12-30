import "./preferences.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { infoActions } from "../../../data/UserInfo/infoSlice";
import Select from "@atlaskit/select";
import {
  fetchUpcomingGames,
  fetchPreviousGames,
} from "../../../data/UserInfo/infoActions";

function UpdateTeam() {
  const dispatch = useDispatch();
  const [showBTN, setShowBTN] = useState(false);
  const [team, setTeam] = useState(null);
  const teams = useSelector((store) => store.userInfo.teams);

  let item = "";
  let daft = [];
  teams.map((team) => {
    item = { label: team.strTeam, value: team.idTeam };
    daft.push(item);
    return daft;
  });

  function selectionMadeHandler(team) {
    setShowBTN(true);
    setTeam(team);
  }

  function submitValuesHandler() {
    console.log(item);
    dispatch(
      infoActions.userTeamHandler({
        teamSelected: {
          name: team.label,
          id: team.value,
        },
      })
    );
    dispatch(fetchUpcomingGames(team.value));
    dispatch(fetchPreviousGames(team.value));
    setShowBTN(false);
  }

  const btnDisabled = showBTN ? false : true;

  return (
    <div className="preferences-list-teams">
      <Select
        inputId="single-select-example"
        className="preferences-list-teams-select"
        classNamePrefix="react-select"
        options={daft}
        placeholder="Select team"
        onChange={selectionMadeHandler}
      />
      <button
        className="preferences-list-teams-submit"
        onClick={submitValuesHandler}
        disabled={btnDisabled}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateTeam;
