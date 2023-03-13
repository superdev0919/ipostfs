import React, { useEffect } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../PageComponents/PageLoader';
import { fetchError } from '../../../redux/actions';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ContentLoader = () => {
  const { error, loading, message } = useSelector(({ common }) => common);
  var Error;
  if(error!="")
    Error=Object.values(error)[0][0];
  else
    Error="";
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchError(''));
    }, 3000);
  }, [dispatch, error, message]);

  return (
    <React.Fragment>
      {loading && <PageLoader />}
      {
        <Snackbar
          open={Boolean(Error)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="error">
            {Error}
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={Boolean(message)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={SlideTransition}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
      }
    </React.Fragment>
  );
};

export default ContentLoader;
