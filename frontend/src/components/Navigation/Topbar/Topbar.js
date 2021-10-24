import { IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Fragment, useMemo, useState } from "react";
import { FiFilePlus, FiFolderPlus, FiTrash2, FiX, FiStar } from 'react-icons/fi';
import classes from './Topbar.module.scss';
import FormModal from './../../UI/Modals/FormModal/FormModal';
import AlertModal from "../../UI/Modals/AlertModal/AlertModal";
import { connect } from 'react-redux';
import { toggleSelect } from './../../../store/actions/driveActions';
import DownloadModal from './DownloadModal/DownloadModal';
import queryString from 'query-string';

function Topbar(props) {
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [downloadModalOpen, setDownloadModalOpen] = useState(false);
    const params = props.match.params
    const {folderName} = queryString.parse(props.location.search)

    const iconButtons = useMemo(() => {
        if (props.match.params.dashType === 'detail') {
            return null;
        }
        else if (props.selected) {
            return (
                <Fragment>
                    <IconButton aria-label="star">
                        <FiStar />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton aria-label="delete">
                        <FiTrash2 />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton aria-label="disselect" onClick={() => props.onToggleSelect(null)}>
                        <FiX />
                    </IconButton>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    <IconButton aria-label="addFile" onClick={() => setDownloadModalOpen(true)}>
                        <FiFilePlus />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton aria-label="addFolder" onClick={() => setAlertModalOpen(true)}>
                        <FiFolderPlus />
                    </IconButton>
                </Fragment>
            );
        }
    }, [props]);

    const title = useMemo(() => {
        switch(params.dashType) {
            case 'main': return 'Əsas Kabinet';
            case 'shared': return 'Mənimlə Paylaşılanlar';
            case 'stared': return 'Ulduzladıqlarım';
            case 'trash': return 'Zibil Qutusu';
            case 'detail': return 'Fayl Parameterləri';
            case 'folder': return 'Qovluq - ' + folderName;
            default: return ''
        }
    }, [params]);

    return (
        <Fragment>
            <FormModal open={formModalOpen} handleClose={() => setFormModalOpen(false)} />
            <AlertModal open={alertModalOpen} handleClose={() => setAlertModalOpen(false)} />
            <DownloadModal open={downloadModalOpen} handleClose={() => setDownloadModalOpen(false)} />
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
        selected: state.drive.selected,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleSelect: (id) => dispatch(toggleSelect(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);