// import Home from "../views/Home";
// import PlayGame from "../views/PlayGame";
// import WatchGame from "../views/WatchGame";
// import Pending from "../views/Pending";
// import Login from "../views/LoginPage";
// import Countdown from "../views/CountDownPage";
// import GamePage from "../views/GamePage";
import WinnerPage from "../views/WinnerPage";
import ListWinner from "../views/ListWinner";
import OpenGame from "../views/OpenGame";
import Pages from "../layouts/Pages/Pages.jsx";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import App from "../layouts/App.js";
var indexRoutes = [
  // { path: "/home", name: "Feature", component: Home },
  // { path: "/", name: "Feature", component: Home },
  // { path: "/pending", name: "Pending", component: Pending },
  // { path: "/play-game", name: "Play Game", component: PlayGame },
  // { path: "/watch-game", name: "Watch Game", component: WatchGame },
  // { path: "/login", name: "Login", component: Login },
  // { path: "/countdown", name: "Countdown", component: Countdown },
  // { path: "/gamepage", name: "GamePage", component: GamePage },
  { path: "/winner", name: "WinnerPage", component: WinnerPage },
  { path: "/listWinner/:id", name: "ListWinner", component: ListWinner },
  { path: "/open-game", name: "OpenGame", component: OpenGame },
  { path: "/listWinner", name: "ListWinner", component: ListWinner },
  { path: "/dang-nhap", name: "Pages", component: Pages },
  { path: "/admin-page", name: "Pages", component: Dashboard },
  { path: "/game", name: "App", component: App }//,
  // {
  //   redirect: true,
  //   path: "/",
  //   pathTo: "/game",
  //   name: "App"
  // }
];

export default indexRoutes;
