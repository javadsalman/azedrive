import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { FiHardDrive, FiShare2, FiStar, FiTrash2, FiSave } from 'react-icons/fi'

function BasicList() {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FiHardDrive style={{ fontSize: 22 }} />
                            </ListItemIcon>
                            <ListItemText primary="Əsas Kabinet" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FiShare2 style={{ fontSize: 22 }} />
                            </ListItemIcon>
                            <ListItemText primary="Mənimlə Paylaşılanlar" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FiStar style={{ fontSize: 22 }} />
                            </ListItemIcon>
                            <ListItemText primary="Ulduzladıqlarım" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FiTrash2 style={{ fontSize: 22 }} />
                            </ListItemIcon>
                            <ListItemText primary="Zibil Qutusu" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
            <List>
                <ListItem disablePadding>
                        <ListItemIcon>
                            <FiSave style={{ fontSize: 22, marginLeft: 15 }} />
                        </ListItemIcon>
                        <ListItemText primary="Ümumi yer (5GB-dan 2.34GB)" />
                </ListItem>
            </List>
        </nav>
        </Box >
    );
}

export default BasicList