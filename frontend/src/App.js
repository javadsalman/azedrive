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
// import iaxios from './iaxios';

function App(props) {
    const auth = props.auth;
    useEffect(() => {
        props.onCheckAuth();
        // const resInterceptor = iaxios.interceptors.response.use(res=>res, error => {
        //     console.log(error)
        // })

        // return () => {
        //     iaxios.interceptors.response.reject(resInterceptor);
        // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const routes = useMemo(() => {
        if (auth) {
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
            )
        }
        else {
            return (
                <Switch>
                    <Route path="/auth/:authType" component={Auth} />
                    <Redirect to="/auth/login" />
                </Switch>
            )
        }
    }, [auth]);

    
    return (
        <div>
            {routes}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        auth: Boolean(state.auth.token)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCheckAuth: () => dispatch(checkAuth())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);