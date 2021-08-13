import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import membersReducer from '../features/members/membersSlice';
import slidesSlice from '../features/slides/slidesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    activities: activitiesReducer,
    members: membersReducer,
    slides: slidesSlice,
  },
});
