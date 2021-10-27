import { TextField } from '@mui/material';
import classes from './CommentSection.module.scss';
import Comment from './../../../components/UI/Comment/Comment';

function CommentSection(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.InputDiv}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Şərh Yaz"
                    multiline
                    minRows={1}
                    classes={{root: classes.TextField}}
                    />
            </div>
            <div className={classes.CommentsDiv}>
                <Comment content="Çox xoşuma gəldi bu aplikasiya. İşlərinizin davamını arzulayıram"/>
            </div>
            <div className={classes.CommentsDiv}>
                <Comment content="Çox xoşuma gəldi bu aplikasiya. İşlərinizin davamını arzulayıram"/>
            </div>
            <div className={classes.CommentsDiv}>
                <Comment content="Çox xoşuma gəldi bu aplikasiya. İşlərinizin davamını arzulayıram"/>
            </div>
            <div className={classes.CommentsDiv}>
                <Comment content="Çox xoşuma gəldi bu aplikasiya. İşlərinizin davamını arzulayıram"/>
            </div>
        </div>
    )
}

export default CommentSection;