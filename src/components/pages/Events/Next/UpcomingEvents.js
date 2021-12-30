import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getTeamInfo, eventLayoutSche } from "../../teamDetails/Helper";

function UpcomingEvents() {
  const events = useSelector(
    (store) => store.eventReducer.events.next15.events
  );
  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const teams = useSelector((store) => store.userInfo.teams);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    className: "upcoming-events",
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const z = events.map((game) => {
    let exclude = "";

    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);
    const optClass = "events-upcoming-item";

    if (liveGames) {
      liveGames.map((event) => {
        if (event.idEvent === game.idEvent) {
          exclude = event;
        }
      });

      // exclude event from showing if its currently LIVE

      if (exclude.idEvent === game.idEvent) return;
    }

    const b = eventLayoutSche(game, homeTeam, awayTeam, optClass);

    return (
      <div className="events-past-item" key={game.idEvent}>
        {b}
      </div>
    );
  });

  return (
    <div className="events-upcoming">
      <div className="events-past-head">
        <div className="events-past-head-title">
          <h4>Upcoming Games</h4>
          <span>Quick view of games to come.</span>
        </div>
      </div>
      <Slider {...settings}>{z}</Slider>
    </div>
  );
}

export default UpcomingEvents;
