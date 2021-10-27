import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { useCallback } from 'react';

function FormModal(props) {
    const enterPressHandler = useCallback((event) => {
        if (event.key === 'Enter') {
            props.handleSubmit();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.handleSubmit]);
    
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.text}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={props.inputValue}
                        onChange={props.inputChange}
                        onKeyPress={enterPressHandler}
                        id="name"
                        label={props.inputLabel}
                        type={props.inputType}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Çıx</Button>
                    <Button onClick={props.handleSubmit}>{props.submitButtonName}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormModal;