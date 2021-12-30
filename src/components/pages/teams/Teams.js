import "./teams.scss";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { infoActions } from "../../../data/UserInfo/infoSlice";
import { useDispatch } from "react-redux";
import Team from "./Team";
import { useSelector } from "react-redux";
import HomeSkeleton from "../../loads/HomeSkeleton";

function Teams() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTeam, setSelectedTeam] = useState({});
  const teamStatus = useSelector((store) => store.userInfo.teamLoadStatus);
  const team = useSelector((store) => store.userInfo.teamSelected);
  const changeTeam = useSelector((store) => store.userInfo.changeTeam);
  const allTeams = useSelector((store) => store.userInfo.teams);
  const teamSelected = Object.keys(selectedTeam).length !== 0;

  // this should be moved to app to prevent slight teams page load
  useEffect(() => {
    document.title = `Teams`;
    if (team.id !== undefined && changeTeam === false)
      return history.push(`/teams/${team.id}`);
  }, [teamSelected, history, team, changeTeam]);

  function submitHandler(e) {
    dispatch(
      infoActions.userTeamHandler({
        teamSelected: {
          name: selectedTeam.name,
          id: selectedTeam.id,
        },
      })
    );
    history.push(`teams/${selectedTeam.id}`);
  }

  const classType = !teamSelected ? "submit hide" : "submit";

  if (teamStatus === "loading") return <HomeSkeleton />;

  function getValues(value) {
    setSelectedTeam(value);
  }

  return (
    <form className="teams" onSubmit={submitHandler}>
      {allTeams.map((team) => (
        <Team
          checked={!teamSelected ? "unchecked" : "checked"}
          value={team.strTeam}
          img={team.strTeamBadge}
          key={team.idTeam}
          id={team.idTeam}
          values={getValues}
        />
      ))}
      <button className={classType} type="submit">
        <span>{selectedTeam.name}</span>
        <span className="submit-span">Submit</span>
      </button>
    </form>
  );
}

export default Teams;
