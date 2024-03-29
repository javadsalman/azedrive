import { Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Box } from '@mui/system';
import classes from './ShareSection.module.scss';
import { useEffect, useState, useCallback, Fragment } from 'react';
import iaxios from './../../../iaxios';

function ShareSection(props) {
    const [sharedList, setSharedList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // load shared users username list
        iaxios.get(`/filelist/${props.fileId}/sharedusers/`)
            .then(response => {
                setSharedList(response.data);
            })
    }, [props.fileId]);

    const listButtonClickHandler = useCallback((userId) => {
        // collect selected users
        setSelectedList(prevState => {
            if (prevState.includes(userId)) {
                return prevState.filter(e => e !== userId)
            }
            else {
                const newState = prevState.slice()
                newState.push(userId);
                return newState;
            }
        });
    }, []);

    const deleteUsersHandler = useCallback(() => {
        // delete selected users
        iaxios.delete(`/filelist/${props.fileId}/sharedusers/`, {
            data: { deletedUsers: selectedList }
        }).then(response => {
            setSharedList(response.data);
            // clear selected list
            setSelectedList([]);
        })
    }, [props.fileId, selectedList]);

    const addUserHandler = useCallback(() => {
        iaxios.post(`/filelist/${props.fileId}/sharedusers/`, { input: input })
            .then(response => {
                setSharedList(prevState => {
                    // check does user already exists in shared list for avoid multiple adding
                    if (prevState.findIndex(e => e.id === response.data.id) === -1) {
                        // copy list and add user to top
                        const newState = prevState.slice();
                        newState.unshift(response.data);
                        return newState;
                    } else {
                        return prevState;
                    }
                });
                setInput('');
            });
    }, [props.fileId, input]);

    return (
        <div className={classes.Container}>
            <div className={classes.ListDiv}>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label="secondary mailbox folders" className={classes.Nav}>
                        <List className={classes.List}>
                            {
                                sharedList.map((sharedUser, index) => {
                                    return (
                                        <Fragment key={sharedUser.id}>
                                            <ListItem disablePadding selected={selectedList.includes(sharedUser.id)}>
                                                <ListItemButton onClick={() => listButtonClickHandler(sharedUser.id)}>
                                                    <ListItemText primary={`${index+1}. ${sharedUser.username}`} />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                        </Fragment>
                                    )
                                })
                            }
                        </List>
                    </nav>
                </Box>
            </div>
            <div className={classes.SettingsDiv}>
                <div className={classes.TextFieldDiv}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={input}
                        onChange={event => setInput(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === 'Enter')
                                addUserHandler();
                        }}
                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                        placeholder="Istifadəçi Adı və ya Email"

                    />
                </div>
                <div className={classes.AddButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        onClick={addUserHandler}
                        variant="contained">
                        İstifadəçi Əlavə Et
                    </Button>
                </div>
                <div className={classes.DeleteButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        onClick={deleteUsersHandler}
                        variant="contained">
                        İstifadəçiləri Sil
                    </Button>
                </div>
                <div className={classes.ToggleCommentFeature}>
                    <Button
                        variant="contained"
                        color={props.commentOn ? "secondary" : 'primary'}
                        onClick={props.changeCommentOn}
                        fullWidth
                        size="large"
                    >
                        {props.commentOn ? 'Şərhi Bağla' : 'Şərhi Aç'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ShareSection;