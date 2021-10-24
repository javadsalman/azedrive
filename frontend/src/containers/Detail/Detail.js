import classes from './Detail.module.scss';
import Button from '@mui/material/Button';
import ShareSection from './ShareSection/ShareSection';
import CommentSection from './CommentSection/CommentSection';
import FileIcon from '../../components/UI/File/FileIcon/FileIcon';

function Detail(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.AbstractDiv}>
                <div className={classes.Abstract}>
                    <div className={classes.IconDiv}>
                        <FileIcon type="video" size={120} />
                    </div>
                    <p className={classes.Title}>
                        interstellar_1080p.mp4
                    </p>
                    <p className={classes.Description}>
                        Interstellar Filmi Full HD Türkçe Dublaj. IMDB puanı 9. En çok izlenenler sırasında
                    </p>
                </div>
            </div>
            <div className={classes.InfoDiv}>
                <div className={classes.InfoColumn}>
                    <h3 className={classes.InfoTitle}>Müəllif</h3>
                    <p className={classes.InfoResult}>cavadsalman</p>
                </div>
                <div className={classes.InfoColumn}>
                    <h3 className={classes.InfoTitle}>Tarix</h3>
                    <p className={classes.InfoResult}>05.11.2020</p>
                </div>
                <div className={classes.DownloadButtonDiv}>
                    <Button
                        className={classes.DownloadButton}
                        variant="contained"
                        color="success"
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
                        fullWidth
                        size="large"
                    >
                        Sil
                    </Button>
                </div>

                <div className={classes.SharedDiv}>
                    <ShareSection />
                </div>
            </div>
            <div className={classes.CommentDiv}>
                <CommentSection />
            </div>
        </div>
    )
}

export default Detail;