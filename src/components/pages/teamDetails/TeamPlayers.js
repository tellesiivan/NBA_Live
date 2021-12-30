import { useSelector, useDispatch } from "react-redux";
import { fetchTeamPlayers } from "../../../data/UserInfo/infoActions";
import "./team.scss";
import PlayersContainer from "../../loads/PlayersContainer";
import { useEffect } from "react";
function TeamPlayers(props) {
  let content = "";
  const dispatch = useDispatch();
  const players = useSelector((store) => store.userInfo.players);
  const status = useSelector((store) => store.userInfo.playersLoadStatus);

  useEffect(() => {
    dispatch(fetchTeamPlayers(props.id));
  }, [dispatch]);

  // players list content

  const playersList = players.map((player) => (
    <div key={player.idPlayer} className="playerItem">
      <span>{player.strPlayer}</span>
      <p>{player.strPosition}</p>
    </div>
  ));

  // set content based on loading status | not the best way to do it
  if (status === "loading") {
    content = <PlayersContainer />;
  } else if (status === "done") {
    content = playersList;
  }

  return <div className="playersContainer">{content}</div>;
}

export default TeamPlayers;
