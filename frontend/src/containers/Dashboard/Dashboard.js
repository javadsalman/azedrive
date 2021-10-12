import classes from './Dashboard.module.scss'
import FileSection from './DashboardSections/FileSection/FileSection';
import FolderSection from './DashboardSections/FolderSection/FolderSection';


function Dashboard(props) {

    return(
        <div className={classes.Container}>
            <p className={classes.FolderTitle}>Qovluqlar</p>
            <FolderSection />
            <p className={classes.FileTitle}>Fayllar</p>
            <FileSection />
        </div>
    )
}

export default Dashboard;