import classes from './FolderSection.module.scss';
import Folder from './../../../../components/UI/Folder/Folder';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { setSelected } from './../../../../store/actions/driveActions';

function FolderSection(props) {

    return (
        <Fragment>
            <p className={classes.FolderTitle}>Qovluqlar</p>
            <div className={classes.Container}>
                {props.folders.map(folder => {
                    return <Folder 
                        name={folder.name}
                        click={() => props.click(folder.id, 'folder', folder.name)}
                        stared={folder.stared} 
                        selected={props.selectedId === folder.id && props.selectedItemType === 'folder'}
                        key={folder.id}/>
                })}
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        folders: state.drive.folders,
        selectedId: state.drive.selectedId,
        selectedItemType: state.drive.selectedItemType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onsetSelected: (id, itemType) => dispatch(setSelected(id, itemType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderSection);