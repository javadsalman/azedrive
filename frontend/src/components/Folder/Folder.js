import classes from './Folder.module.scss';
import { FcOpenedFolder } from 'react-icons/fc';
import { BsFillStarFill } from 'react-icons/bs';

const selectedStyle = { backgroundColor: 'rgb(188, 235, 255)'}

function Folder(props) {

    return (
        <div 
        className={classes.Container} 
        style={props.selected ? selectedStyle : {}}
        onClick={props.click}>
            {
                props.stared
                ?
                <BsFillStarFill className={classes.Star}/>
                :
                null
            }
            <FcOpenedFolder className={classes.FolderIcon}/>
            <p className={classes.FolderName}>{props.name}</p>
        </div>
    )
}

export default Folder