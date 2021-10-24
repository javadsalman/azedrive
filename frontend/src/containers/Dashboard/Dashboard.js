import classes from './Dashboard.module.scss'
import FileSection from './DashboardSections/FileSection/FileSection';
import FolderSection from './DashboardSections/FolderSection/FolderSection';
import BlockSpinner from './../../components/UI/Spinner/BlockSpinner/BlockSpinner';
import { connect } from 'react-redux';
import { Fragment } from 'react';


function Dashboard(props) {

    return(
        <div className={classes.Container}>
            {
                props.loading
                ?
                <BlockSpinner />
                :
                <Fragment>
                    <FolderSection />
                    <FileSection />
                </Fragment>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        loading: state.drive.loading,
    };
}

export default connect(mapStateToProps)(Dashboard);