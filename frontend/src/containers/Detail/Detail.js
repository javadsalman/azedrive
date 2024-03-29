import classes from './Detail.module.scss';
import Button from '@mui/material/Button';
import ShareSection from './ShareSection/ShareSection';
import CommentSection from './CommentSection/CommentSection';
import BlockSpinner from '../../components/UI/Spinner/BlockSpinner/BlockSpinner';
import { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import iaxios from './../../iaxios';
import { connect } from 'react-redux';
import FileIcon from './../../components/File/FileIcon/FileIcon';

function Detail(props) {
    const [loading, setLoading] = useState(false);
    const [fileInfo, setFileInfo] = useState({});
    
    const {fileId} = queryString.parse(props.location.search);

    useEffect(() => {
        setLoading(true);
        iaxios.get(`/filelist/${fileId}/`)
        .then(response => {
            setFileInfo(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        });
    }, [fileId]);

    const downloadHandler = useCallback(() => {
        // go to download link
        window.open(fileInfo.downloadUrl, '_blank');
    }, [fileInfo.downloadUrl]);

    const deleteHandler = useCallback(() => {
        // send delete request and go to folder of deleted file. If file hasn't folder then go to main dashboard
        iaxios.delete(`/filelist/${fileId}/`)
        .then(response => {
            let url = '/dashboard/main';
            if (fileInfo.folder) {
                url = queryString.stringifyUrl({
                    url: '/dashboard/folder',
                    query: {
                        folderId: fileInfo.folder,
                        folderName: fileInfo.folderName
                    }
                })
            }
            
            props.history.push(url);

        });
    }, [props.history, fileId, fileInfo]);

    const changeCommentOnStatus = useCallback(() => {
        setLoading(true);
        // send patch request for open or close comment section
        iaxios.patch(`/filelist/${fileId}/`, {
            'commentOn': !fileInfo.commentOn
        }).then(response => {
            // response holds the new file info with new comment status
            setFileInfo(response.data);
            setLoading(false);
        }).catch(error => setLoading(false));
    }, [fileId, fileInfo.commentOn]);

    return (
        <div className={classes.Container}>
            { loading ? <BlockSpinner /> : null}
            <div className={classes.AbstractDiv}>
                <div className={classes.Abstract}>
                    <div className={classes.IconDiv}>
                        <FileIcon type={fileInfo.type} size={120} />
                    </div>
                    <p className={classes.Title}>
                        {fileInfo.name}
                    </p>
                    <p className={classes.Size}>
                        <b>({sizeCalculate(fileInfo.size)})</b>
                    </p>
                    <p className={classes.Description}>
                        {fileInfo.description}
                    </p>
                </div>
            </div>
            <div className={classes.InfoDiv}>
                <div className={classes.InfoColumn}>
                    <h3 className={classes.InfoTitle}>Müəllif</h3>
                    <p className={classes.InfoResult}>{fileInfo.username}</p>
                </div>
                <div className={classes.InfoColumn}>
                    <h3 className={classes.InfoTitle}>Tarix</h3>
                    <p className={classes.InfoResult}>{fileInfo.created}</p>
                </div>
                <div className={classes.DownloadButtonDiv}>
                    <Button
                        className={classes.DownloadButton}
                        variant="contained"
                        color="success"
                        onClick={downloadHandler}
                        fullWidth
                        size="large"
                    >
                        Yüklə
                    </Button>
                </div>
                <div className={classes.DeleteButtonDiv}>
                    <Button
                        className={classes.DeleteButtonDiv}
                        variant="contained"
                        color="error"
                        onClick={deleteHandler}
                        fullWidth
                        size="large"
                    >
                        Sil
                    </Button>
                </div>

                <div className={classes.SharedDiv}>
                    {
                        props.userId === fileInfo.author
                        ?
                        <ShareSection 
                            fileId={fileId}
                            changeCommentOn={changeCommentOnStatus} 
                            commentOn={fileInfo.commentOn}/>
                        :
                        null
                    }
                </div>
            </div>
            <div className={classes.CommentDiv}>
                {fileInfo.commentOn
                    ?
                    <CommentSection 
                        userId={props.userId} 
                        isOwner={props.userId === fileInfo.author}
                        fileId={fileId}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        userId: Number(state.auth.userId)
    };
};

export default connect(mapStateToProps)(Detail);

function sizeCalculate(size) {
    if (size < 1024) {
        return size.toFixed(2) + ' B'
    }
    else if (size < 1024**2) {
        return (size / 1024).toFixed(2) + ' KB'
    }
    else if (size < 1024**3) {
        return (size / 1024**2).toFixed(2) + ' MB'
    }
    else if (size < 1024**4) {
        return (size / 1024**3).toFixed(2) + ' GB'
    }
}