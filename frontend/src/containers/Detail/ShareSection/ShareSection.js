import { Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Box } from '@mui/system';
import classes from './ShareSection.module.scss';

function ShareSection(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.ListDiv}>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Divider />
                    <nav aria-label="secondary mailbox folders" className={classes.Nav}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Trash" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div>
            <div className={classes.SettingsDiv}>
                <div className={classes.TextFieldDiv}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ backgroundColor: 'white', borderRadius: 5 }}
                        placeholder="Istifadəçi adı və ya Email"

                    />
                </div>
                <div className={classes.AddButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained">
                        İstifadəçi əlavə et
                    </Button>
                </div>
                <div className={classes.DeleteButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained">
                        İstifadəçi sil
                    </Button>
                </div>
                <div className={classes.ToggleCommentFeature}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                    >
                        Şərhi Bağla
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ShareSection;