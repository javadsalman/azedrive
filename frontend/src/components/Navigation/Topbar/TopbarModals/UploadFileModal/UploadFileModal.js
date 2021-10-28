import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import classes from './UploadFileModal.module.scss'
import { useCallback, useRef, useState } from 'react';
import iaxios from '../../../../../iaxios';
import { connect } from 'react-redux';
import { addFileAction, loadTotalSize } from "../../../../../store/actions/driveActions";

function UploadFileModal(props) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const inputRef = useRef();

    const fileSelectHandler = useCallback((event) => {
        setFile(event.target.files[0])
    }, []);

    const uploadFileHandler = useCallback(()=>{
        const formData = new FormData();
        formData.append('name', file.name);
        formData.append('folder', Number(props.parentFolderId) || null);
        formData.append('description', description);
        formData.append('file_object', file);
        formData.append('size', file.size);
        iaxios.post(
            '/filelist/', 
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data'
            }}
        ).then(response => {
            props.onAddFile(response.data);
            props.onLoadTotalSize();
        })
        props.handleClose();
        setFile('');
        setDescription('');
        inputRef.current.value = '';
    }, [file, description, props]);

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Fayl Yükləmə</DialogTitle>
                <DialogContent>
                    {<DialogContentText>
                        Aşağıdan fayl açıqlamasını qeyd edin və yükləmək istədyiniz faylı seçin
                    </DialogContentText>}
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
                        <input ref={inputRef} className={classes.FileInput} type="file" onChange={fileSelectHandler} />
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

function mapStateToProps(state) {
    return {
        token: state.auth.token,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onAddFile: (newFile) => dispatch(addFileAction(newFile)),
        onLoadTotalSize: () => dispatch(loadTotalSize()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileModal);