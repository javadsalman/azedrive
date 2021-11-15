import { IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Fragment, useCallback, useMemo, useState } from "react";
import { FiFilePlus, FiFolderPlus, FiTrash2, FiX, FiStar, FiRotateCcw } from 'react-icons/fi';
import classes from './Topbar.module.scss';
import { connect } from 'react-redux';
import { setSelected, deleteSelected, starSelected, restore } from './../../../store/actions/driveActions';
import queryString from 'query-string';
import AddFolderModal from './TopbarModals/AddFolderModal/AddFolderModal';
import UploadFileModal from './TopbarModals/UploadFileModal/UploadFileModal';

function Topbar(props) {
    const [modal, setModal] = useState(null);
    const { folderName, folderId } = queryString.parse(props.location.search);
    const dashType = props.match.params.dashType;

    const iconButtons = useMemo(() => {
        // don't show any buttons on topbar if dash type is file detail
        if (dashType === 'detail') {
            return null;
        }
        else if (props.selectedId) {
            return (
                <Fragment>
                    {
                        // if dash type is trash then show restore item button for make item undeleted
                        dashType === 'trash'
                            ?
                            <Fragment>
                                <IconButton aria-label="disselect" onClick={props.onRestore}>
                                    <FiRotateCcw />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                            </Fragment>
                            :
                            null
                    }
                    {
                        // add staring buttons if dash type isn't trash
                        dashType !== 'trash'
                            ?
                            <Fragment>
                                <IconButton aria-label="star" onClick={props.onStarSelected}>
                                    <FiStar />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                            </Fragment>
                            :
                            null
                    }
                    {/* show delete and disselect buttons at any selected situations */}
                    <IconButton aria-label="delete" onClick={props.onDeleteSelected}>
                        <FiTrash2 />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton aria-label="disselect" onClick={() => props.onsetSelected(null, null)}>
                        <FiX />
                    </IconButton>
                </Fragment>
            );
        }
        // if dash type is main or folder then show upload file and folder buttons
        else if (['main', 'folder'].includes(dashType)) {
            return (
                <Fragment>
                    <IconButton aria-label="addFile" onClick={() => setModal('UploadFileModal')}>
                        <FiFilePlus />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton aria-label="addFolder" onClick={() => setModal('AddFolderModal')}>
                        <FiFolderPlus />
                    </IconButton>
                </Fragment>
            );
        }
    }, [props, dashType]);

    const title = useMemo(() => {
        switch (dashType) {
            case 'main': return 'Əsas Kabinet';
            case 'shared': return 'Mənimlə Paylaşılanlar';
            case 'stared': return 'Ulduzladıqlarım';
            case 'trash': return 'Zibil Qutusu';
            case 'detail': return 'Fayl Parameterləri';
            case 'folder': return 'Qovluq - ' + folderName;
            default: return '';
        }
    }, [dashType, folderName]);

    const closeModalHandler = useCallback(() => {
        setModal(null);
    }, [setModal]);

    return (
        <Fragment>
            <AddFolderModal parentFolderId={folderId} open={modal === 'AddFolderModal'} handleClose={closeModalHandler} />
            <UploadFileModal parentFolderId={folderId} open={modal === 'UploadFileModal'} handleClose={closeModalHandler} />
            <div className={classes.Container}>
                <div className={classes.TitleDiv}>
                    <p className={classes.Title}>{title}</p>
                </div>
                <div className={classes.Space}></div>
                <div className={classes.StackDiv}>

                    <Stack
                        style={{ height: '100%', paddingRight: 15 }}
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        {iconButtons}
                    </Stack>
                </div>
            </div>
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        selectedId: state.drive.selectedId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onsetSelected: (id, itemType) => dispatch(setSelected(id, itemType)),
        onDeleteSelected: () => dispatch(deleteSelected()),
        onStarSelected: () => dispatch(starSelected()),
        onRestore: () => dispatch(restore()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);