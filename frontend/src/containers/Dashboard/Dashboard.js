import FolderSection from '../../components/DashboardSections/FolderSection/FolderSection';
import classes from './Dashboard.module.scss'
import FileSection from './../../components/DashboardSections/FileSection/FileSection';


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