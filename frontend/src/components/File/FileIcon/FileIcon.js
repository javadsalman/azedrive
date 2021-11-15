import classes from './FileIcon.module.scss';
import { useMemo } from 'react';
import { 
    BsFillFileEarmarkExcelFill,
    BsFillFileEarmarkFill, 
    BsFillFileEarmarkFontFill, 
    BsFillFileEarmarkImageFill, 
    BsFillFileEarmarkMusicFill, 
    BsFillFileEarmarkPdfFill, 
    BsFillFileEarmarkPlayFill, 
    BsFillFileEarmarkPptFill, 
    BsFillFileEarmarkWordFill, 
    BsFillFileEarmarkZipFill,
} from 'react-icons/bs';


function FileIcon(props) {
    const icon = useMemo(() => {
        switch(props.type) {
            case 'pdf':
                return <BsFillFileEarmarkPdfFill className={classes[props.type]}/>
            case 'word':
                return <BsFillFileEarmarkWordFill className={classes[props.type]}/>
            case 'excel':
                return <BsFillFileEarmarkExcelFill className={classes[props.type]}/>
            case 'slide':
                return <BsFillFileEarmarkPptFill className={classes[props.type]}/>
            case 'text':
                return <BsFillFileEarmarkFontFill className={classes[props.type]}/>
            case 'archive':
                return <BsFillFileEarmarkZipFill className={classes[props.type]}/>
            case 'image':
                return <BsFillFileEarmarkImageFill className={classes[props.type]}/>
            case 'audio':
                return <BsFillFileEarmarkMusicFill className={classes[props.type]}/>
            case 'video':
                return <BsFillFileEarmarkPlayFill className={classes[props.type]}/>
            default:
                return <BsFillFileEarmarkFill className={classes.undefined}/>
        }
    }, [props.type])
    return <span style={{fontSize: props.size}}>{icon}</span>
}

export default FileIcon;