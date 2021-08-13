import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import usersReducer from '../features/users/usersSlice';
import membersReducer from '../features/members/membersSlice';
import slidesSlice from '../features/slides/slidesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    activities: activitiesReducer,
    users: usersReducer,
    members: membersReducer,
    slides: slidesSlice,
  },
});
