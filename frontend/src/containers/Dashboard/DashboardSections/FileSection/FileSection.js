import classes from './FileSection.module.scss';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import File from './../../../../components/File/File';

function FileSection(props) {
    return (
        <Fragment>
            <p className={classes.FileTitle}>Fayllar</p>
            <div className={classes.Container}>
                {props.files.map(file => {
                    return <File 
                        name={file.name}
                        type={file.type}
                        click={() => props.click(file.id, 'file', file.name)}
                        stared={file.stared}
                        selected={props.selectedId === file.id && props.selectedItemType === 'file'} 
                        key={file.id}/>
                })}
                
            </div>
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        files: state.drive.files,
        selectedId: state.drive.selectedId,
        selectedItemType: state.drive.selectedItemType
    };
}


export default connect(mapStateToProps)(FileSection);