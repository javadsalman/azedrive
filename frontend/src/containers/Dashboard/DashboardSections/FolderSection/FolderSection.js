import classes from './FolderSection.module.scss';
import Folder from './../../../../components/UI/Folder/Folder';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleSelect } from './../../../../store/actions/driveActions';

function FolderSection(props) {

    return (
        <Fragment>
            <p className={classes.FolderTitle}>Qovluqlar</p>
            <div className={classes.Container}>
                {props.folders.map(folder => {
                    return <Folder 
                        name={folder.name}
                        click={() => props.ontoggleSelect(folder.id)}
                        stared={folder.stared} 
                        selected={props.selected === folder.id}
                        key={folder.id}/>
                })}
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        folders: state.drive.folders,
        selected: state.drive.selected
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ontoggleSelect: (id) => dispatch(toggleSelect(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderSection);