import classes from './FileSection.module.scss';
import File from './../../../../components/UI/File/File';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleSelect } from './../../../../store/actions/driveActions';

function FileSection(props) {

    return (
        <Fragment>
            <p className={classes.FileTitle}>Fayllar</p>
            <div className={classes.Container}>
                {props.files.map(file => {
                    return <File 
                        name={file.name}
                        type={file.type}
                        click={() => props.ontoggleSelect(file.id)}
                        stared={file.stared}
                        selected={props.selected === file.id} 
                        key={file.id}/>
                })}
                
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        files: state.drive.files,
        selected: state.drive.selected
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ontoggleSelect: (id) => dispatch(toggleSelect(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSection)