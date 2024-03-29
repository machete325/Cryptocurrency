import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HomeActionCreator } from '../../actions/Home/index';
import EventNoteIcon from '@material-ui/icons/EventNote';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Footer/index';
import { Props, ParamTypes } from '../../types/TokenInfoTypes';
import db from '../../db';

import s from './TokenInfo.module.scss';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  icons: {
    color: '#0F2795',
  },
}));

const TokenInfo: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { info } = useParams<ParamTypes>();
  const { tokenInfo } = props;
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    props.dispatch(HomeActionCreator.getInfoData(info, db.cryptocurrency));
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {tokenInfo && Object.keys(tokenInfo).length !== 0 && (
          <div className={s.content}>
            <div className={s.important}>{tokenInfo.important}</div>
            <div className={s.main_info}>
              <div className={s.container_logo}>
                <div className={s.logo}>
                  <img src={tokenInfo.images.logo}></img>
                </div>
                <div className={s.token_name}>{tokenInfo.name}</div>
              </div>
              {tokenInfo.images.img === '' ? (
                <div className={s.video_container}>
                  <iframe
                    title={tokenInfo.name}
                    width="640"
                    height="360"
                    src={tokenInfo.images.video}
                    onLoad={() => setLoader(false)}>
                    Video
                  </iframe>
                  {loader ? (
                    <Backdrop className={classes.backdrop} open={loader}>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) : null}
                </div>
              ) : (
                <div className={s.image_container}>
                  <img
                    width="640"
                    height="360"
                    src={tokenInfo.images.img}
                    onLoad={() => setLoader(false)}></img>
                  {loader ? (
                    <Backdrop className={classes.backdrop} open={loader}>
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  ) : null}
                </div>
              )}
            </div>
            <div className={s.container_info}>
              <div className={s.container_info_name}>
                <EventNoteIcon className={classes.icons} />
                <div>Token Info:</div>
              </div>
              {tokenInfo.ticker && <div>Ticker: {tokenInfo.ticker}</div>}
              {tokenInfo.tokenType && <div>Token type: {tokenInfo.tokenType}</div>}
              {tokenInfo.tokenPrice && <div>ICO Token Price: {tokenInfo.tokenPrice}</div>}
              {tokenInfo.fundraisingGoal && (
                <div>Fundraising Goal: {tokenInfo.fundraisingGoal}</div>
              )}
              {tokenInfo.totalTokens && <div>Total Tokens: {tokenInfo.totalTokens}</div>}
              {tokenInfo.tokenSale && <div>Available for Token Sale: {tokenInfo.tokenSale}</div>}
            </div>
            <div className={s.container_role}>
              <InfoOutlinedIcon className={classes.icons} />
              <div>SHORT REVIEW:</div>
            </div>
            <div>Role of Token: {tokenInfo.roleOfToken}</div>
            {tokenInfo.links.length !== 0 && (
              <>
                <div className={s.container_links}>
                  <AttachFileIcon className={classes.icons} />
                  <div>Links:</div>
                </div>
                <div className={s.links}>
                  {tokenInfo.links.map((item: any, index: number) => (
                    <a href={item.link} key={index}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default TokenInfo;
