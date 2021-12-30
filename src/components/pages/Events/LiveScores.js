import { useSelector } from "react-redux";
import { getTeamInfo, eventLiveScore } from "../teamDetails/Helper";
import "./events.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LiveScores() {
  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const teams = useSelector((store) => store.userInfo.teams);
  const scoresSetting = useSelector(
    (store) => store.userInfo.settings.hideScores
  );
  if (!liveGames) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 14000,
    arrows: false,
    className: "live-events_1",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const z = liveGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);

    const hideScores = scoresSetting;
    const b = eventLiveScore(game, homeTeam, awayTeam, undefined, hideScores);

    return (
      <div className="live-score" key={game.idEvent}>
        {b}
      </div>
    );
  });
  // console.log("z", z);
  // console.log("liveGames", liveGames);

  return <Slider {...settings}>{z}</Slider>;
}

export default LiveScores;
