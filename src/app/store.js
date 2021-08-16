import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/authSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import newsReducer from '../features/news/newsSlice';
import usersReducer from '../features/users/usersSlice';
import membersReducer from '../features/members/membersSlice';
import slidesSlice from '../features/slides/slidesSlice';
import aboutReducer from '../features/about/aboutSlice';

export default configureStore({
  reducer: {
    auth: userReducer,
    activities: activitiesReducer,
    news: newsReducer,
    users: usersReducer,
    members: membersReducer,
    slides: slidesSlice,
    about: aboutReducer,
  },
});
