import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Button from '@material-ui/core/Button';
 import Profile from '../../../services/profile';
import { alpha, makeStyles } from '@material-ui/core/styles';
 import { CurrentAuthMethod } from '../../../@jumbo/constants/AppConstants';
import AuthWrapper from '../../../@jumbo/components/Common/authComponents/AuthWrapper';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  saveButton: {
    fontSize: '18px',
    paddingLeft: 30,
    paddingRight:30
  },
}));

//variant = 'default', 'standard', 'bgColor'
const ProfileSet = ({  variant = 'standard', wrapperVariant = 'default' }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  var initialName=authUser.name;
  var initialEmail=authUser.email;
  var initialPassword="";
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    dispatch(Profile.onProfile({ name, email, password }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent} mt={3}>

        <form>
          <Box mb={5}>
            <TextField
              label={<IntlMessages id="appModule.name" />}
              fullWidth
              onChange={event => setName(event.target.value)}
              defaultValue={name}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={5}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={8}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'right' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary" className={classes.saveButton}>
                <IntlMessages id="appModule.save" />
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthWrapper>
  );
};

export default ProfileSet;
