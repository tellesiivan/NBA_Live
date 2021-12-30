import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import TeamContent from "./TeamContent";
import { Fragment } from "react";

function TeamDetails() {
  const match = useRouteMatch();
  const teams = useSelector((store) => store.userInfo.teams);
  const teamID = match.params.teamId;

  return (
    <Fragment>
      {teams.map((team) => {
        if (team.idTeam === teamID) {
          return (
            <TeamContent
              key={teamID}
              stadiumName={team.strStadium}
              stadiumImg={team.strStadiumThumb}
              teamName={team.strTeam}
              teamDesc={team.strDescriptionEN}
              teamID={teamID}
            />
          );
        }
      })}
    </Fragment>
  );
}

export default TeamDetails;
