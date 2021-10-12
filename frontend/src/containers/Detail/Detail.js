import { BsFillFileEarmarkPlayFill } from 'react-icons/bs';
import classes from './Detail.module.scss';
import Button from '@mui/material/Button'
import ShareSection from './ShareSection/ShareSection';
import CommentSection from './CommentSection/CommentSection';

function Detail(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.AbstractDiv}>
                <div className={classes.IconDiv}>
                    <BsFillFileEarmarkPlayFill />
                </div>
                <div className={classes.TitleDiv}>
                    interstellar_1080p.mp4
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
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        size="large"
                    >
                        Yüklə
                    </Button>
                </div>
                <div>
                    <Button
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
                <h1 className={classes.CommentTitle}>ŞƏRHLƏR</h1>
                <CommentSection />
            </div>
        </div>
    )
}

export default Detail;