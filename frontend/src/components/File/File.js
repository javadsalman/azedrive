import classes from './File.module.scss';
import {
    BsFillStarFill
} from 'react-icons/bs';
import FileIcon from './FileIcon/FileIcon';

const selectedStyle = { backgroundColor: 'rgb(188, 235, 255)' }

function File(props) {
    return (
        <div 
        className={classes.Container}
        style={props.selected ? selectedStyle : {}}
        onClick={props.click}>
            {
                props.stared
                ?
                <BsFillStarFill className={classes.Star} />
                :
                null
            }
            <FileIcon type={props.type} size={50} />
            <p className={classes.FileName}>{props.name}</p>
        </div>
    )
}

export default File