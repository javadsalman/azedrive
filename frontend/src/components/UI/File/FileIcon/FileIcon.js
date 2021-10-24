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
            case 'doc':
                return <BsFillFileEarmarkWordFill className={classes[props.type]}/>
            case 'xml':
                return <BsFillFileEarmarkExcelFill className={classes[props.type]}/>
            case 'ppt':
                return <BsFillFileEarmarkPptFill className={classes[props.type]}/>
            case 'txt':
                return <BsFillFileEarmarkFontFill className={classes[props.type]}/>
            case 'zip':
                return <BsFillFileEarmarkZipFill className={classes[props.type]}/>
            case 'image':
                return <BsFillFileEarmarkImageFill className={classes[props.type]}/>
            case 'music':
                return <BsFillFileEarmarkMusicFill className={classes[props.type]}/>
            case 'video':
                return <BsFillFileEarmarkPlayFill className={classes[props.type]}/>
            default:
                return <BsFillFileEarmarkFill className={classes.default}/>
        }
    }, [props.type])
    return <span style={{fontSize: props.size}}>{icon}</span>
}

export default FileIcon;