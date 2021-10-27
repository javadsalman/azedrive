import FormModal from "../../../../UI/Modals/FormModal/FormModal";
import { useState, useCallback } from 'react';
import { addFolder } from './../../../../../store/actions/driveActions';
import { connect } from 'react-redux';


function AddFolderModal(props) {
    const [folderName, setFolderName] = useState('');

    const addFolderHandler = useCallback(() => {
        props.onAddFolder(folderName, props.parentFolderId || null);
        props.handleClose();
        setFolderName('');
    }, [props, folderName, setFolderName]);

    return <FormModal
        open={props.open}
        title="Qovluq Əlave Et"
        text=""
        inputValue={folderName}
        inputChange={event => setFolderName(event.target.value)}
        inputLabel="Qovluq Adı"
        inputType="text"
        handleClose={props.handleClose}
        handleSubmit={addFolderHandler}
        submitButtonName="Əlave Et"
    />
}

function mapDispatchToProps(dispatch) {
    return {
        onAddFolder: (folderName, parentFolderId) => dispatch(addFolder(folderName, parentFolderId)),
    }
}


export default connect(null, mapDispatchToProps)(AddFolderModal);