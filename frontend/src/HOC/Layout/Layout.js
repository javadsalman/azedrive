import classes from './Layout.module.scss';
import Appbar from './../../components/Navigation/Appbar/Appbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Topbar from '../../components/Navigation/Topbar/Topbar';
import Dashboard from '../../containers/Dashboard/Dashboard';


function Layout(props) {
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
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default Layout