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
        iaxios.get(`/filelist/${props.fileId}/sharedusers/`)
            .then(response => {
                setSharedList(response.data);
            })
    }, [props.fileId]);

    const listButtonClickHandler = useCallback((userId) => {
        setSelectedList(prevState => {
            if (prevState.includes(userId)) {
                console.log('in', prevState.filter(e => e !== userId))
                return prevState.filter(e => e !== userId)
            }
            else {
                const newState = prevState.slice()
                newState.push(userId);
                console.log('not in ', newState)
                return newState;
            }
        });
    }, []);

    const deleteUsersHandler = useCallback(() => {
        iaxios.delete(`/filelist/${props.fileId}/sharedusers/`, {
            data: { deletedUsers: selectedList }
        }).then(response => {
            setSharedList(response.data);
            setSelectedList([]);
        })
    }, [props.fileId, selectedList]);

    const addUserHandler = useCallback(() => {
        iaxios.post(`/filelist/${props.fileId}/sharedusers/`, { input: input })
            .then(response => {
                setSharedList(prevState => {
                    const newState = prevState.slice();
                    newState.unshift(response.data);
                    return newState;
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