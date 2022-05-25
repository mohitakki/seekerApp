import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice from './userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice
    }
}
);