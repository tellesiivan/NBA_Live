import "../events.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTeamInfo, eventLayoutOpt } from "../../teamDetails/Helper";
import { eventActions } from "../../../../data/UserInfo/eventSlice";

function PastEvents() {
  const match = useRouteMatch();

  const homePth = match.path === "/home";
  console.log(homePth);
  const dispatch = useDispatch();
  const scoresSetting = useSelector(
    (store) => store.userInfo.settings.hideScores
  );
  const events = useSelector(
    (store) => store.eventReducer.events.last15.events
  );

  const teams = useSelector((store) => store.userInfo.teams);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4.1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    className: "past-events",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3.24,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2.09,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const z = events.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);
    const optClass = "events-past-item-second";

    const b = eventLayoutOpt(game, homeTeam, awayTeam, optClass, scoresSetting);

    return (
      <div className="events-past-item" key={game.idEvent}>
        {b}
      </div>
    );
  });

  function showEventsHandler() {
    dispatch(eventActions.toggleShowEvents());
  }

  return (
    <div className="events-past">
      <div className="events-past-head">
        <div className="events-past-head-title">
          <h4>Around the league</h4>
          <span>Previous scores & more.</span>
        </div>
        {!homePth && (
          <button className="events-past-head-btn" onClick={showEventsHandler}>
            <span></span> View Game Calendar
          </button>
        )}
      </div>

      <Slider {...settings}>{z}</Slider>
    </div>
  );
}

export default PastEvents;
