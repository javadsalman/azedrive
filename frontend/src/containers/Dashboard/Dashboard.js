import classes from './Dashboard.module.scss'
import FileSection from './DashboardSections/FileSection/FileSection';
import FolderSection from './DashboardSections/FolderSection/FolderSection';
import BlockSpinner from './../../components/UI/Spinner/BlockSpinner/BlockSpinner';
import { connect } from 'react-redux';
import { Fragment, useEffect, useCallback } from 'react';
import { loadDashboard, setSelected } from './../../store/actions/driveActions';
import queryString from 'query-string';


function Dashboard(props) {

    const { dashType } = props.match.params
    const { folderId } = queryString.parse(props.location.search)
    const itemClickHandler = useCallback((id, itemType, name) => {
        props.onSetSelected(id, itemType);
        if (id === props.selectedId && itemType === props.selectedItemType) {
            if (itemType === 'folder') {
                const url = queryString.stringifyUrl({
                    url: '/dashboard/folder',
                    query: {
                        folderId: id,
                        folderName: name
                    }
                });
                props.history.push(url);
            }
            else if (itemType === 'file') {
                const url = queryString.stringifyUrl({
                    url: '/dashboard/detail',
                    query: {
                        fileId: id,
                    }
                });
                props.history.push(url);
            }
        }
    }, [props])

    useEffect(() => {
        if (props.token) {
            switch(dashType) {
                case 'main':
                    props.onLoadDashboard();
                    break;
                case 'shared':
                    props.onLoadDashboard({shared: true, contentType: 'file'});
                    break;
                case 'stared':
                    props.onLoadDashboard({stared: true});
                    break;
                case 'trash':
                    props.onLoadDashboard({deleted: true});
                    break;
                case 'folder':
                    props.onLoadDashboard({parentFolder: folderId});
                    break;
                default:;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.token, dashType, folderId])

    return(
        <div className={classes.Container}>
            {
                props.loading
                ?
                <BlockSpinner />
                :
                <Fragment>
                    { props.haveFolder ? <FolderSection click={itemClickHandler}/> : null }
                    { props.haveFile ? <FileSection click={itemClickHandler}/> : null }
                </Fragment>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        loading: state.drive.loading,
        token: state.auth.token,
        haveFile: state.drive.files.length > 0,
        haveFolder: state.drive.folders.length > 0,
        selectedId: state.drive.selectedId,
        selectedItemType: state.drive.selectedItemType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadDashboard: (customLoadSettings) => dispatch(loadDashboard(customLoadSettings)),
        onSetSelected: (id, itemType) => dispatch(setSelected(id, itemType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);