import { Avatar, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import classes from './Comment.module.scss';
import { useState, memo, useEffect, useMemo, useCallback } from 'react';
import { BsThreeDotsVertical, BsX } from 'react-icons/bs';


function Comment(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState('');
    const open = Boolean(anchorEl);

    useEffect(() => {
        // set the default value of comment to input for change operation
        setText(props.content);
    }, [props.content])

    const changeHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            props.changeComment(props.id, text);
            props.clearMustChangeId();
        }
    }, [props, text]);

    const rightButton = useMemo(() => {
        // if user hasn't delete or change permission don't show button
        if (props.hasDeletePermission || props.hasChangePermission) {
            // if changing operation continue then set X button for cancel it
            if (props.mustChange) {
                return (
                    <IconButton onClick={() => {
                        props.clearMustChangeId();
                        setText(props.content);
                    }}>
                        <BsX />
                    </IconButton>
                );
            }
            // else show three dot button for show change and delete buttons
            else {
                return (
                    <IconButton
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <BsThreeDotsVertical />
                    </IconButton>
                );
            }
        }
        else {
            return null;
        }
    }, [open, props]);

    return (
        <div className={classes.Container}>
            <div className={classes.PhotoDiv}>
                <Avatar sx={{
                    width: 65,
                    height: 65,
                    bgcolor: 'rgb(31, 108, 250)',
                    fontSize: 35
                }}>{props.username[0].toUpperCase()}</Avatar>
            </div>
            <div className={classes.TextDiv}>
                <div className={classes.NameDiv}>
                    <b>{props.username}</b>
                </div>
                <div className={classes.ContentDiv}>
                    {/* if comment must change then show input else show the comment content */}
                    {props.mustChange
                        ?
                        <TextField
                            variant="standard"
                            fullWidth
                            value={text}
                            classes={{ root: classes.TextField }}
                            onChange={event => setText(event.target.value)}
                            onKeyPress={changeHandler}
                        />
                        :
                        <p className={classes.Content}>{text}</p>
                    }
                </div>
            </div>
            <div className={classes.SettingsDiv}>
                {rightButton}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        props.hasDeletePermission
                            ?
                            <MenuItem onClick={props.deleteComment}>Sil</MenuItem>
                            :
                            null
                    }
                    {
                        props.hasChangePermission
                            ?
                            <MenuItem
                                onClick={() => {
                                    props.setMustChangeId();
                                    setAnchorEl(null)
                                }}>
                                Dəyiş
                            </MenuItem>
                            :
                            null
                    }
                </Menu>
            </div>
        </div>
    );
}

export default memo(Comment);