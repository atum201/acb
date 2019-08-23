/* eslint-disable react/no-string-refs */
import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { Header, Footer, Sidebar } from "components";
import dashboardRoutes from "routes/dashboard.jsx";
import { connect } from "react-redux";
import AlertSuccess from "../../components/SweetAlert/AlertSuccess";
import { actResetFetchResource } from "../../actions/fetch.action";
import AlertError from "../../components/SweetAlert/AlertError";
import NotificationAlert from "react-notification-alert";
import PropTypes from "prop-types";

var ps;

class Dashboard extends React.Component {
  state = {
    fetchSuccess: false,
    fetchFail: false
  };

  componentDidMount() {
    this.checkLogin();
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchSuccess) {
      this.setState({ fetchSuccess: true });
    } else if (nextProps.fetchSuccess === null) {
      this.setState({ fetchFail: false });
    } else if (nextProps.fetchFail) {
      this.setState({ fetchFail: true });
    } else if (nextProps.fetchFail) {
      this.setState({ fetchFail: false });
    }
    if (nextProps.notify !== null && nextProps.notify !== this.props.notify) {
      this.notify(nextProps.notify.message, nextProps.notify.color);
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  checkLogin = () => {
    if (!localStorage.getItem("access_token_admin")) {
      //this.props.history.push("/dang-nhap");
    }
  };

  notify(message, color) {
    const options = {
      place: "tr",
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: color,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 4
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  render() {
    const props = this.props;
    const fetchSuccess = props.fetchSuccess;
    const fetchFail = props.fetchFail;
    return (
      <div className="wrapper">
        <NotificationAlert ref="notificationAlert" />
        {fetchSuccess && (
          <AlertSuccess
            {...props}
            message={fetchSuccess.message}
            confirmTo={fetchSuccess.confirmTo}
            resetFetchResource={props.resetFetchResource}
          />
        )}
        {fetchFail && (
          <AlertError
            {...props}
            message={fetchFail.message}
            confirmTo={fetchFail.confirmTo}
            resetFetchResource={props.resetFetchResource}
          />
        )}
        <Sidebar {...this.props} routes={dashboardRoutes} />
        <div className="main-panel" ref="mainPanel" style={{overflow:"auto"}}>
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.collapse) {
                return prop.views.map((prop2, key2) => {
                  return (
                    <Route
                      path={prop2.path}
                      component={prop2.component}
                      key={key2}
                      exact={prop2.exact}
                    />
                  );
                });
              }
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  key={key}
                  exact={prop.exact}
                />
              );
            })}
          </Switch>
          {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-maps") !==
          -1 ? null : (
            <Footer fluid />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchSuccess: state.fetchReducer.fetchSuccess,
    fetchFail: state.fetchReducer.fetchFail,
    notify: state.fetchReducer.notify
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetFetchResource: () => {
      dispatch(actResetFetchResource());
    }
  };
};

Dashboard.propTypes = {
  fetchSuccess: PropTypes.bool,
  fetchFail: PropTypes.bool,
  notify: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
