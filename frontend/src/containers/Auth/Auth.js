import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Switch } from 'react-router';
import classes from './Auth.module.scss'
import { Route, Redirect, Link } from 'react-router-dom';

function Auth(props) {
    const [input, setInput] = useState('');
    const [password, setPassowrd] = useState('');
    const authType = props.match.params.authType
    return (
        <div className={classes.Container}>
            <div 
                className={classes.LoginBox}
                style={{height: authType === 'login' ? 350 : 440}}>
                <div className={classes.TitleDiv}>
                    <p className={classes.Title}>AZEDRIVE</p>
                </div>
                <Switch>
                    <Route path="/auth/login">
                        <div className={classes.InputDiv}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                classes={{ root: classes.TextField }}
                                placeholder="Istifadəçi Adı və ya Email"
                            />
                        </div>
                    </Route>

                    <Route path="/auth/register">
                        <div className={classes.InputDiv}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                classes={{ root: classes.TextField }}
                                placeholder="Istifadəçi Adı"
                            />
                        </div>
                        <div className={classes.InputDiv}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                classes={{ root: classes.TextField }}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                    </Route>
                    
                    <Redirect to="/auth/login" />
                </Switch>
                <div className={classes.PasswordDiv}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={event => setPassowrd(event.target.value)}
                        classes={{ root: classes.TextField }}
                        placeholder="Şifrə"
                    />
                </div>
                <div className={classes.ButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        classes={{ root: classes.Button }}
                        variant="contained">
                        {authType === 'login' ? 'GIRIŞ' : 'QEYDIYYAT'}

                    </Button>
                    <div className={classes.RegLogDiv}>
                        <Link
                            to={`/auth/${authType === 'login' ? 'register' : 'login'}`}
                            className={classes.RegLog}
                        >
                            {authType === 'login' ? 'QEYDIYYAT' : 'GIRIŞ'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Auth;