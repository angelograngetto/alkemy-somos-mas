import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Logout = () => {
  const history = useHistory();
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    } else {
      dispatch(logout());
      history.push('/');
    }
  }, []);

  return null;
};

export default Logout;
