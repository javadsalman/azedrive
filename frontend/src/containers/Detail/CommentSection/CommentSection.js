import { TextField } from '@mui/material';
import classes from './CommentSection.module.scss';
import Comment from './../../../components/UI/Comment/Comment';
import { useState, useEffect, useCallback, } from 'react';
import iaxios from './../../../iaxios';

function CommentSection(props) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [changeCommentId, setChangeCommentId] = useState(null);

    useEffect(() => {
        iaxios.get(`/filelist/${props.fileId}/commentlist/`)
            .then(response => {
                setComments(response.data);
            });
    }, [props.fileId]);

    const addCommentHandler = useCallback(() => {
        iaxios.post(`/filelist/${props.fileId}/commentlist/`, {content: newComment})
        .then(response => {
            setComments(prevState => {
                const newState = prevState.slice();
                newState.unshift(response.data);
                return newState;
            });
            setNewComment('');
        });
    }, [props.fileId, newComment]);


    const deleteCommentHandler = useCallback((commentId) => {
        iaxios.delete(`/filelist/${props.fileId}/commentlist/${commentId}/`)
        .then(response => {
            setComments(prevState => {
                return prevState.filter(comment => comment.id!==commentId);
            });
        });
    }, [props.fileId]);

    const changeCommentHandler = useCallback((commentId, changedContent) => {
        iaxios.patch(`/filelist/${props.fileId}/commentlist/${commentId}/`, {content: changedContent})
        .then(response => {
            setComments(prevState => {
                return prevState.map(comment => {
                    if (comment.id === commentId) {
                        return response.data;
                    } else {
                        return comment;
                    }
                });
            });
        });
    }, [props.fileId]);

    return (
        <div className={classes.Container}>
            <div className={classes.InputDiv}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Şərh Yaz"
                    value={newComment}
                    onChange={event => setNewComment(event.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter')
                            addCommentHandler();
                    }}
                    multiline
                    minRows={1}
                    classes={{ root: classes.TextField }}
                />
            </div>
            <div className={classes.CommentsDiv}>
                {
                    comments.map(comment => {
                        return (
                            <Comment
                                id={comment.id}
                                deletePermission={props.isOwner || props.authId === comment.author}
                                changePermission={props.authId === comment.author}
                                deleteComment={() => deleteCommentHandler(comment.id)}
                                username={comment.username}
                                content={comment.content}
                                shouldChange={changeCommentId === comment.id}
                                setChangeId={() => {setChangeCommentId(comment.id)}}
                                clearChangeId={() => {setChangeCommentId(null)}}
                                changeComment={changeCommentHandler}
                                key={comment.id}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CommentSection;