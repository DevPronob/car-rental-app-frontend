import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQurey = fetchBaseQuery({
    baseUrl: 'https://car-rental-app-backend.vercel.app/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQurey,
    endpoints: () => ({}),
    tagTypes: ['car', 'booking', 'user'],
})