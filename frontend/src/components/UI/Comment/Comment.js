import { Avatar, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import classes from './Comment.module.scss';
import { useState, memo, useEffect } from 'react';
import { BsThreeDotsVertical, BsX } from 'react-icons/bs';


function Comment(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState('');
    const [change, setChange] = useState(false);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setText(props.content);
    }, [props.content])


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
                    {change
                        ?
                        <TextField
                            variant="standard"
                            fullWidth
                            value={text}
                            classes={{root: classes.TextField}}
                            onChange={event => setText(event.target.value)}
                        />
                        :
                        <p className={classes.Content}>{text}</p>
                    }
                </div>
            </div>
            <div className={classes.SettingsDiv}>
                {change
                    ?
                    <IconButton onClick={() => {
                        setChange(false);
                        setText(props.content);
                    }}>
                        <BsX />
                    </IconButton>
                    :
                    <IconButton
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <BsThreeDotsVertical />
                    </IconButton>
                }


                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem >Sil</MenuItem>
                    <MenuItem 
                        onClick={() => {
                            setChange(true);
                            setAnchorEl(null)
                        }}>
                        Dəyiş
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default memo(Comment);