import "./live.scss";
import { Carousel } from "@trendyol-js/react-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { liveItem, getTeamInfo, eventLiveScore } from "../Helper";

function LiveSugg() {
  // async function getTickets() {
  //   try {
  //     const startR = await fetch(
  //       "https://api.seatgeek.com/2/events?q=boston+celtics&client_id=Mjg2MjMyNnwxNjIwMTYyMDYyLjk0OTM3OA"
  //     );
  //     const dljksal = await startR.json();
  //     console.log(dljksal);
  //   } catch (error) {}
  // }
  // getTickets();
  const scoresSetting = useSelector(
    (store) => store.userInfo.settings.hideScores
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4.25,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 14000,
    arrows: false,
    className: "sugg-item_live",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.15,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const liveGames = useSelector((store) => store.userInfo.live.games.all);
  const teams = useSelector((store) => store.userInfo.teams);

  const z = liveGames.map((game) => {
    const homeTeam = getTeamInfo(game.idHomeTeam, teams);
    const awayTeam = getTeamInfo(game.idAwayTeam, teams);
    const hideScores = scoresSetting;
    const b = eventLiveScore(game, homeTeam, awayTeam, undefined, hideScores);

    return (
      <div className="sugg-item" key={game.idEvent}>
        {b}
      </div>
    );
  });
  // console.log("z", z);
  // console.log("liveGames", liveGames);
  if (!liveGames) return null;
  return <Slider {...settings}>{z}</Slider>;
}

export default LiveSugg;
