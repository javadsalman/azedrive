import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { logout } from '../../../store/actions/authActions';
import { connect } from 'react-redux';


function ButtonAppBar(props) {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AZEDRIVE
                    </Typography>

                    {/* <SearchSection /> */}

                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={() => setOpen(prevState => !prevState)}
                    >
                        cavadsalman
                    </Button>
                    <Menu
                        id="basic-menu"
                        // anchorEl={anchorEl}
                        open={open}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        onClose={()=>setOpen(false)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={props.onLogout}>Çıxış</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(ButtonAppBar);