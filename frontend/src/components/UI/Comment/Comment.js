import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import classes from './Comment.module.scss';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';


function Comment(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.Container}>
            <div className={classes.PhotoDiv}>
                <Avatar sx={{ 
                    width: 65, 
                    height: 65,
                    bgcolor: 'rgb(31, 108, 250)',
                    fontSize: 35
                    }}>C</Avatar>
            </div>
            <div className={classes.TextDiv}>
                <div className={classes.NameDiv}>
                    <b>cavadsalman</b>
                </div>
                <div className={classes.ContentDiv}>
                    <p className={classes.Content}>Çox xoşuma gəldi bu aplikasiya. İşlərinizin davamını arzulayıram</p>
                </div>
            </div>
            <div className={classes.SettingsDiv}>
                <IconButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <BsThreeDotsVertical />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Comment;