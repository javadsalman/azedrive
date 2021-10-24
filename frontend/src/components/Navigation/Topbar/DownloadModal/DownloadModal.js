import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import classes from './DownloadModal.module.scss';
import { useCallback, useState } from 'react';
import iaxios from './../../../../iaxios';
import { useHistory } from "react-router";
import queryString from 'query-string';

function DownloadModal(props) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const history = useHistory();
    const {folderId} = queryString.parse(history.location.search)

    console.log(folderId)

    const fileSelectHandler = useCallback((event) => {
        setFile(event.target.files[0])
    }, []);

    const uploadFileHandler = useCallback(()=>{
        iaxios.post('/filelist/', {
            folder: folderId || null,
            description: description,
            size: file.size
        }).then(response => console.log(response))
    }, [file, folderId, description]);

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Fayl Yükləmə</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Fayl Açıqlaması"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <label htmlFor="contained-button-file">
                        <input className={classes.FileInput} type="file" onChange={fileSelectHandler} />
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Çıxış</Button>
                    <Button onClick={uploadFileHandler}>Yükləmək</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DownloadModal;