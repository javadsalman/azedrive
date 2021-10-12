import { TextField } from '@mui/material';
import classes from './CommentSection.module.scss';
import Comment from './../../../components/UI/Comment/Comment';

function CommentSection(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.InputDiv}>
                <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Şərh Yaz"
                    multiline
                    minRows={2}
                    classes={{InputLabel: classes.TextField}}
                    />
            </div>
            <div className={classes.CommentsDiv}>
                <Comment />
            </div>
            <div className={classes.CommentsDiv}>
                <Comment />
            </div>
            <div className={classes.CommentsDiv}>
                <Comment />
            </div>
            <div className={classes.CommentsDiv}>
                <Comment />
            </div>
        </div>
    )
}

export default CommentSection;