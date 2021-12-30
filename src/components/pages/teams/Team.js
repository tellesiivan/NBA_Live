import "./teams.scss";

function Team(props) {
  function getValue(e) {
    props.values({
      name: e.target.value,
      id: e.target.id,
    });
  }

  return (
    <div className="team">
      <label>
        <input
          id={props.id}
          type="radio"
          value={props.value}
          className="teamRadio"
          onChange={getValue}
        />
        <img src={props.img} alt={props.value} />
      </label>
    </div>
  );
}

export default Team;
