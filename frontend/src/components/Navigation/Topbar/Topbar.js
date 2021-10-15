import { IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Fragment, useState } from "react";
import { FiTrash2 } from 'react-icons/fi';
import classes from './Topbar.module.scss';
import FormModal from './../../UI/Modals/FormModal/FormModal';
import AlertModal from "../../UI/Modals/AlertModal/AlertModal";

function Topbar(props) {
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [alertModalOpen, setAlertModalOpen] = useState(false);

    const formModalOpenHandler = () => {
        setFormModalOpen(true);
    };
    const alertModalOpenHandler = () => {
        setAlertModalOpen(true);
    };

    return (
        <Fragment>
            <FormModal open={formModalOpen} handleClose={() => setFormModalOpen(false)}/>
            <AlertModal open={alertModalOpen} handleClose={() => setAlertModalOpen(false)}/>
            <div className={classes.Container}>
                <div className={classes.TitleDiv}>
                    <p className={classes.Title}>Əsas Kabinet</p>
                </div>
                <div className={classes.Space}></div>
                <div className={classes.StackDiv}>

                    <Stack
                        style={{ height: '100%', paddingRight: 15 }}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        <IconButton aria-label="delete" onClick={formModalOpenHandler}>
                            <FiTrash2 />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={alertModalOpenHandler}>
                            <FiTrash2 />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <FiTrash2 />
                        </IconButton>
                    </Stack>
                </div>
            </div>
        </Fragment>
    )
}

export default Topbar;