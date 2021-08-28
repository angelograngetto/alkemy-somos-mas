import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/authSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import newsReducer from '../features/news/newsSlice';
import usersReducer from '../features/users/usersSlice';
import membersReducer from '../features/members/membersSlice';
import slidesSlice from '../features/slides/slidesSlice';
import categoriesSlice from '../features/categories/categoriesSlice';
import aboutReducer from '../features/about/aboutSlice';

const reducers = combineReducers({
  auth: userReducer,
  activities: activitiesReducer,
  news: newsReducer,
  users: usersReducer,
  members: membersReducer,
  slides: slidesSlice,
  categories: categoriesSlice,
  about: aboutReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
