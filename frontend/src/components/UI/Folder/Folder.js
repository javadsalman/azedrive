import classes from './Folder.module.scss';
import { FcOpenedFolder } from 'react-icons/fc';
import { BsFillStarFill } from 'react-icons/bs';

function Folder(props) {

    return (
        <div className={classes.Container}>
            <BsFillStarFill className={classes.Star}/>
            <FcOpenedFolder className={classes.FolderIcon}/>
            <p className={classes.FolderName}>Şəkillər</p>
        </div>
    )
}

export default Folder