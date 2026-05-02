import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userInfo
            })
        }),
        signUpDriver: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/driver-signup',
                method: 'POST',
                body: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/signin',
                method: 'POST',
                body: userInfo
            })
        }),

    })
})

export const { useSignUpMutation, useLoginMutation, useSignUpDriverMutation } = authApi