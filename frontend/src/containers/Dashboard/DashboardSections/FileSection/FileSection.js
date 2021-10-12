import classes from './FileSection.module.scss';
import File from './../../../../components/UI/File/File';

function FileSection(props) {

    return (
        <div className={classes.Container}>
            <File type="pdf"/>
            <File type="pdf"/>
            <File type="doc"/>
            <File type="doc"/>
            <File type="xml"/>
            <File type="xml"/>
            <File type="ppt"/>
            <File type="ppt"/>
            <File type="txt"/>
            <File type="txt"/>
            <File type="zip"/>
            <File type="zip"/>
            <File type="image"/>
            <File type="image"/>
            <File type="music"/>
            <File type="music"/>
            <File type="video"/>
            <File type="video"/>
            <File type="aaaaa"/>
            <File type="aaaaa"/>
            <File type="aaaaa"/>
        </div>
    )
}

export default FileSection