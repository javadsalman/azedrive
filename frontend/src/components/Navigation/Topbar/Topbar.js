import { IconButton, Stack } from "@mui/material";
import Divider from '@mui/material/Divider';
import { FiTrash2 } from 'react-icons/fi';
import classes from './Topbar.module.scss';

function Topbar(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.TitleDiv}>
                <p className={classes.Title}>Əsas Kabinet</p>
            </div>
            <div className={classes.Space}></div>
            <div className={classes.StackDiv}>

                <Stack
                    style={{ height: '100%', paddingRight: 15}}
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <IconButton  aria-label="delete">
                        <FiTrash2 />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <FiTrash2 />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <FiTrash2 />
                    </IconButton>
                </Stack>
            </div>
        </div>
    )
}

export default Topbar;