import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getTeamInfo, eventLayoutSche } from "../../teamDetails/Helper";

function SelectedTeamNext() {
  const upcomingGames = useSelector((store) => store.userInfo.upcomingGames);
  const teamSelected = useSelector((store) => store.userInfo.teamSelected);
  const teams = useSelector((store) => store.userInfo.teams);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 9000,
    arrows: false,
    className: "upcoming-events",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2.05,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const content = upcomingGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);

    const optClass = "selected-next";

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
          <h4>{teamSelected.name} | Up Next</h4>
          <span>Your team's upcoming games</span>
        </div>
      </div>
      <Slider {...settings}>{content}</Slider>
    </div>
  );
}

export default SelectedTeamNext;
