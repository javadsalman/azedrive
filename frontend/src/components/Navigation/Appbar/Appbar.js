import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { logout } from '../../../store/actions/authActions';
import { connect } from 'react-redux';





function ButtonAppBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={props.onLogout}>Çıxış</MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        AZEDRIVE
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                            color="primary"
                        >
                            {props.username}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}

function mapStateToProps(state) {
    return {
        username: state.auth.username
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);