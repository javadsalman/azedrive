import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import classes from './Login.module.scss'

function Login(props) {
    const [input, setInput] = useState('');
    const [password, setPassowrd] = useState('');

    return (
        <div className={classes.Container}>
            <div className={classes.LoginBox}>
                <div className={classes.TitleDiv}>
                    <p className={classes.Title}>AZEDRIVE</p>
                </div>
                <div className={classes.InputDiv}>
                    <TextField
                    fullWidth
                    variant="outlined"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    classes={{root: classes.TextField}}
                    placeholder="Istifadəçi Adı və ya Email"
                     />
                </div>
                <div className={classes.PasswordDiv}>
                    <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={event => setPassowrd(event.target.value)}
                    classes={{root: classes.TextField}}
                    placeholder="Şifrə"
                     />
                </div>
                <div className={classes.ButtonDiv}>
                    <Button 
                    fullWidth
                    size="large"
                    classes={{root: classes.Button}}
                    variant="contained">
                        GIRIŞ
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default Login;