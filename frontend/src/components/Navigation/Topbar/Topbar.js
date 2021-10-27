import { IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Fragment, useCallback, useMemo, useState } from "react";
import { FiFilePlus, FiFolderPlus, FiTrash2, FiX, FiStar } from 'react-icons/fi';
import classes from './Topbar.module.scss';
import { connect } from 'react-redux';
import { setSelected, deleteSelected, starSelected } from './../../../store/actions/driveActions';
import queryString from 'query-string';
import AddFolderModal from './TopbarModals/AddFolderModal/AddFolderModal';
import UploadFileModal from './TopbarModals/UploadFileModal/UploadFileModal';

function Topbar(props) {
    const [modal, setModal] = useState(null);
    const {folderName, folderId} = queryString.parse(props.location.search)

    const iconButtons = useMemo(() => {
        if (props.match.params.dashType === 'detail') {
            return null;
        }
        else if (props.selectedId) {
            return (
                <Fragment>
                    <IconButton aria-label="star" onClick={props.onStarSelected}>
                        <FiStar />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
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
        else {
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
    }, [props]);

    const title = useMemo(() => {
        switch(props.match.params.dashType) {
            case 'main': return 'Əsas Kabinet';
            case 'shared': return 'Mənimlə Paylaşılanlar';
            case 'stared': return 'Ulduzladıqlarım';
            case 'trash': return 'Zibil Qutusu';
            case 'detail': return 'Fayl Parameterləri';
            case 'folder': return 'Qovluq - ' + folderName;
            default: return ''
        }
    }, [props.match.params, folderName]);

    const closeModalHandler = useCallback(() => {
        setModal(null);
    }, [setModal])

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
    )
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);