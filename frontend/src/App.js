import { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.module.scss';
import Appbar from './components/Navigation/Appbar/Appbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';
import Topbar from './components/Navigation/Topbar/Topbar';
import Dashboard from './containers/Dashboard/Dashboard';
import Detail from './containers/Detail/Detail';
import Auth from './containers/Auth/Auth';

function App() {
    const auth = false;
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
                            <Route path="/dashboard/:pagetype" component={Topbar} />
                        </div>
                        <div className={classes.DashboardDiv}>
                            <Switch>
                                <Route path="/dashboard/detail" component={Detail} />
                                <Route path="/dashboard" component={Dashboard} />
                                <Redirect to="/dashboard" exact />
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

export default App;
