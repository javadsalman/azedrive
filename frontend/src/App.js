import { useEffect, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.module.scss';
import Appbar from './components/Navigation/Appbar/Appbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';
import Topbar from './components/Navigation/Topbar/Topbar';
import Dashboard from './containers/Dashboard/Dashboard';
import Detail from './containers/Detail/Detail';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import { checkAuth } from './store/actions/authActions';

function App(props) {
    useEffect(() => {
        // check local storage for auth informations such as token, username, and userId when app start
        props.onCheckAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onCheckAuth]);


    const routes = useMemo(() => {
        if (props.token || props.token === false) {
            return (
                <div className={classes.Container}>
                    <div className={classes.AppbarDiv}>
                        <Appbar />
                    </div>
                    <div className={classes.SidebarDiv}>
                        <Sidebar />
                    </div>
                    <div className={classes.MainDiv}>
                        <div className={classes.TopbarDiv}>
                            <Switch>
                                <Route path="/dashboard/:dashType" component={Topbar} />
                            </Switch>
                        </div>
                        <div className={classes.DashboardDiv}>
                            <Switch>
                                <Route path="/dashboard/detail" component={Detail} />
                                <Route path="/dashboard/:dashType" component={Dashboard} />
                                <Redirect to="/dashboard/main" exact />
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Switch>
                    <Route path="/auth/:authType" component={Auth} />
                    <Redirect to="/auth/login" />
                </Switch>
            );
        }
    }, [props.token]);

    
    return (
        <div>
            {routes}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCheckAuth: () => dispatch(checkAuth()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);