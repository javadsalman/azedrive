import classes from './File.module.scss';
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
    BsFillStarFill
} from 'react-icons/bs';
import { useMemo } from 'react';

function File(props) {

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

    return (
        <div className={classes.Container}>
            <BsFillStarFill className={classes.Star}/>
            {icon}
            <p className={classes.FileName}>Şəkillər asdfasdf asdf</p>
        </div>
    )
}

export default File