import LoginPage from "views/Pages/LoginPage.jsx";

const pagesRoutes = [
  {
    path: "/dang-nhap",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: "users_circle-08",
    component: LoginPage
  },
  {
    redirect: true,
    path: "/dang-nhap",
    pathTo: "/dang-nhap",
    name: "Register Page"
  }
];
export default pagesRoutes;
