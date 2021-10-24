import { Button, TextField } from '@mui/material';
import { useState, useCallback } from 'react';
import { Switch } from 'react-router';
import classes from './Auth.module.scss'
import { Route, Redirect, Link } from 'react-router-dom';
import { login, register } from '../../store/actions/authActions';
import { connect } from 'react-redux';

function Auth(props) {
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const authType = props.match.params.authType

    const buttonClickHandler = useCallback(() => {
        if (authType === 'login') {
            props.onLogin(input, password);
        }
        else if (authType === 'register') {
            props.onRegister(username, email, password)
        }
    }, [props, authType, input, username, email, password])

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            buttonClickHandler();
        }
    }, [buttonClickHandler]);

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
                                onKeyPress={handleKeyPress}
                                placeholder="Istifadəçi Adı və ya Email"
                            />
                        </div>
                    </Route>

                    <Route path="/auth/register">
                        <div className={classes.InputDiv}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                                classes={{ root: classes.TextField }}
                                onKeyPress={handleKeyPress}
                                placeholder="Istifadəçi Adı"
                            />
                        </div>
                        <div className={classes.InputDiv}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                classes={{ root: classes.TextField }}
                                type="email"
                                onKeyPress={handleKeyPress}
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
                        onKeyPress={handleKeyPress}
                        placeholder="Şifrə"
                    />
                </div>
                <div className={classes.ButtonDiv}>
                    <Button
                        fullWidth
                        size="large"
                        classes={{ root: classes.Button }}
                        variant="contained"
                        onClick={buttonClickHandler}
                        >
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


function mapDispatchToProps(dispatch) {
    return {
        onLogin: (input, password) => dispatch(login(input, password)),
        onRegister: (username, email, password) => dispatch(register(username, email, password))
    };
}


export default connect(null, mapDispatchToProps)(Auth);