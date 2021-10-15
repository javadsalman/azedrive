import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { FiHardDrive, FiShare2, FiStar, FiTrash2 } from 'react-icons/fi'
import classes from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

function BasicList() {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to="/dashboard/main" className={classes.NavLink} activeClassName={classes.Active}>
                        <ListItem className={classes.ListItem}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FiHardDrive style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText primary="Əsas Kabinet" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to="/dashboard/shared" className={classes.NavLink} activeClassName={classes.Active}>

                        <ListItem className={classes.ListItem}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FiShare2 style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText primary="Mənimlə Paylaşılanlar" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to="/dashboard/stared" className={classes.NavLink} activeClassName={classes.Active}>

                        <ListItem className={classes.ListItem}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FiStar style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText primary="Ulduzladıqlarım" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <Divider />
                    <NavLink to="/dashboard/trash" className={classes.NavLink} activeClassName={classes.Active}>

                        <ListItem className={classes.ListItem}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FiTrash2 style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText primary="Zibil Qutusu" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    <div className={classes.StorageList}>
                        <h3 className={classes.StorageTitle}>Ümumi Yer</h3>
                        <div className={classes.Total}>
                            <div
                                className={classes.Filled}
                                style={{ width: '50%' }}
                            ></div>
                        </div>
                        <p className={classes.StorageAmount}><span className={classes.AmountNumber}>120MB / 500MB</span> istifadə edilir</p>
                    </div>
                </List>
            </nav>
        </Box >
    );
}

export default BasicList