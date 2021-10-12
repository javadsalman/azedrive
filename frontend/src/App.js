import { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Auth/Login/Login';
import classes from './App.module.scss';
import Appbar from './components/Navigation/Appbar/Appbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';
import Topbar from './components/Navigation/Topbar/Topbar';
import Dashboard from './containers/Dashboard/Dashboard';
import Detail from './containers/Detail/Detail';

function App() {
    const auth = true;
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
                            <Topbar />
                        </div>
                        <div className={classes.DashboardDiv}>
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/detail" component={Detail} />
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
                    <Route path="/login" component={Login} />
                    <Redirect to="/login" exact />
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
