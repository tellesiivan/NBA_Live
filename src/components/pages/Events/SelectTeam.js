import { Link } from "react-router-dom";

function SelectTeam() {
  return (
    <div className="message-selectTeam">
      <div className="message-selectTeam-img"></div>
      <div className="message-selectTeam-txt">
        <div className="message-selectTeam-txt-c">
          <h4>Pick your team</h4>
          <span>
            Get more when selecting
            <br />
            your favorite team.
          </span>
          <Link to="/teams">
            <button>Pick Team</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectTeam;
