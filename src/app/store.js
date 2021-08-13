import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import membersReducer from '../features/members/membersSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    activities: activitiesReducer,
    members: membersReducer,
  },
});
