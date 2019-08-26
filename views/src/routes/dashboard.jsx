import BannerPage from "views/AdminPage/BannerPage/BannerPage.jsx";
import BannerCreate from "views/AdminPage/BannerPage/BannerCreate.jsx";

import EnterprisePage from "views/AdminPage/EnterprisePage/EnterprisePage.jsx";
import EnterpriseCreate from "views/AdminPage/EnterprisePage/EnterpriseCreate.jsx";

import EventPage from "views/AdminPage/EventPage/EventPage.jsx";
import EventCreate from "views/AdminPage/EventPage/EventCreate.jsx";

import AccountPage from "views/AdminPage/AccountPage/AccountPage.jsx";
import AccountCreate from "views/AdminPage/AccountPage/AccountCreate.jsx";

// import NewsPage from "views/AdminPage/NewsPage/NewsPage.jsx";
import NewsCreate from "views/AdminPage/NewsPage/NewsCreate.jsx";



import GamePage from "views/AdminPage/GamePage/GamePage.jsx";
import GameCreate from "views/AdminPage/GamePage/GameCreate.jsx";
import GameView from "views/AdminPage/GamePage/GameView.jsx";
import QuestionPage from "views/AdminPage/QuestionPage/QuestionPage.jsx";
import QuestionCreate from "views/AdminPage/QuestionPage/QuestionCreate.jsx";
import QuestionView from "views/AdminPage/QuestionPage/QuestionView.jsx";
import UserPage from "views/AdminPage/UserPage/UserPage.jsx";
import UserPageView from "views/AdminPage/UserPage/UserPageView.jsx";
import AdminAccount from "views/AdminPage/AdminAccount/AdminAccount.jsx";
import AdminAccountUpdate from "views/AdminPage/AdminAccount/AdminAccountUpdate.jsx";
import SetupInfo from "views/AdminPage/SetupInfo/SetupInfo.jsx";
import SetupInfoUpdate from "views/AdminPage/SetupInfo/SetupInfoUpdate.jsx";
import LogoutPage from "views/Pages/LogouPage.jsx";
var dashRoutes = [
  //Enterprise
  {
    path: "/admin-page/danh-sach-enterprise",
    name: "Danh sách doanh nghiệp",
    icon: "fas fa-image",
    component: EnterprisePage
  },
  {
    path: "/admin-page/sua-enterprise/:enterprise_id",
    name: "Sửa enterprise",
    icon: "fas fa-image",
    invisible: true,
    exact: true,
    component: EnterpriseCreate
  },
  {
    path: "/admin-page/them-enterprise",
    name: "Thêm enterprise",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: EnterpriseCreate
  },
  //Banner
  {
    path: "/admin-page/danh-sach-banner",
    name: "Danh sách banner",
    icon: "fas fa-image",
    component: BannerPage
  },
  {
    path: "/admin-page/sua-banner/:banner_id",
    name: "Sửa banner",
    icon: "fas fa-image",
    invisible: true,
    exact: true,
    component: BannerCreate
  },
  {
    path: "/admin-page/them-banner",
    name: "Thêm banner",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: BannerCreate
  },
  
  //Account
  {
    path: "/admin-page/danh-sach-account",
    name: "Danh sách tài khoản",
    icon: "fas fa-image",
    component: AccountPage
  },
  {
    path: "/admin-page/sua-account/:account_id",
    name: "Sửa account",
    icon: "fas fa-image",
    invisible: true,
    exact: true,
    component: AccountCreate
  },
  {
    path: "/admin-page/them-account",
    name: "Thêm account",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: AccountCreate
  },
  //Event
  {
    path: "/admin-page/danh-sach-event",
    name: "Danh sách event",
    icon: "fas fa-image",
    component: EventPage
  },
  {
    path: "/admin-page/sua-event/:event_id",
    name: "Sửa event",
    icon: "fas fa-image",
    invisible: true,
    exact: true,
    component: EventCreate
  },
  {
    path: "/admin-page/them-event",
    name: "Thêm event",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: EventCreate
  },
  {
    path: "/admin-page/them-enterprise",
    name: "Thêm enterprise",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: EnterpriseCreate
  },

  //News
  // {
  //   path: "/admin-page/danh-sach-news",
  //   name: "Danh sách news",
  //   icon: "fas fa-image",
  //   component: NewsPage
  // },
  {
    path: "/admin-page/sua-news/:news_id",
    name: "Sửa news",
    icon: "fas fa-image",
    invisible: true,
    exact: true,
    component: NewsCreate
  },
  {
    path: "/admin-page/them-news",
    name: "Thêm news",
    icon: "fas fa-user-plus",
    invisible: true,
    exact: true,
    component: NewsCreate
  },
  // {
  //   path: "/admin-page/danh-sach-tro-choi",
  //   name: "Danh sách trò chơi",
  //   icon: "fas fa-gamepad",
  //   component: GamePage
  // },
  // {
  //   path: "/admin-page/xem-chi-tiet-tro-choi/:id",
  //   name: "Xem chi tiết trò chơi",
  //   icon: "fas fa-gamepad",
  //   invisible: true,
  //   exact: true,
  //   component: GameView
  // },
  // {
  //   path: "/admin-page/them-tro-choi",
  //   name: "Thêm trò chơi",
  //   icon: "fas fa-user-plus",
  //   invisible: true,
  //   exact: true,
  //   component: GameCreate
  // },
  // {
  //   path: "/admin-page/sua-tro-choi/:id",
  //   name: "Sửa trò chơi",
  //   icon: "fas fa-user-plus",
  //   invisible: true,
  //   exact: true,
  //   component: GameCreate
  // },
  // {
  //   path: "/admin-page/danh-sach-cau-hoi/:id",
  //   name: "Danh sách câu hỏi",
  //   icon: "fas fa-question-circle",
  //   invisible: true,
  //   exact: true,
  //   component: QuestionPage
  // },
  // {
  //   path: "/admin-page/them-cau-hoi/:id",
  //   name: "Thêm câu hỏi",
  //   icon: "fas fa-user-plus",
  //   invisible: true,
  //   exact: true,
  //   component: QuestionCreate
  // },
  // {
  //   path: "/admin-page/sua-cau-hoi/:id",
  //   name: "Sửa câu hỏi",
  //   icon: "fas fa-user-plus",
  //   invisible: true,
  //   exact: true,
  //   component: QuestionCreate
  // },
  // {
  //   path: "/admin-page/xem-cau-hoi/:id",
  //   name: "Xem câu hỏi",
  //   icon: "fas fa-user-plus",
  //   invisible: true,
  //   exact: true,
  //   component: QuestionView
  // },
  // {
  //   path: "/admin-page/danh-sach-nguoi-choi",
  //   name: "Danh sách người chơi",
  //   icon: "fas fa-users",
  //   component: UserPage
  // },
  // {
  //   path: "/admin-page/xem-lich-su-nguoi-choi/:id",
  //   name: "Lịch sử người chơi",
  //   invisible: true,
  //   exact: true,
  //   icon: "fas fa-users",
  //   component: UserPageView
  // },
  // {
  //   path: "/admin-page/thong-tin-cai-dat",
  //   name: "Thông tin và cài đặt",
  //   icon: "fas fa-edit",
  //   component: SetupInfo
  // },
  // {
  //   path: "/admin-page/sua-thong-tin-cai-dat",
  //   name: "Sửa thông tin và cài đặt",
  //   icon: "fas fa-edit",
  //   invisible: true,
  //   exact: true,
  //   component: SetupInfoUpdate
  // },
  {
    path: "/admin-page/quan-tri-vien",
    name: "Tài khoản Quản Trị",
    icon: "fas fa-toolbox",
    component: AdminAccount
  },
  {
    path: "/admin-page/sua-quan-tri-vien",
    name: "Sửa thông tin",
    icon: "fas fa-toolbox",
    invisible: true,
    exact: true,
    component: AdminAccountUpdate
  },
  {
    path: "/admin-page/dang-xuat",
    name: "Đăng xuất",
    permission: "LOGOUT",
    icon: "fas fa-sign-out-alt",
    component: LogoutPage
  },
  {
    redirect: true,
    path: "/admin-page",
    pathTo: "/admin-page/danh-sach-enterprise",
    name: "Dashboard"
  }
];
export default dashRoutes;
