import { baseApi } from "../../api/baseApi"

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getusers: builder.query({
            query: (args) => {
                return {
                    url: '/user',
                    method: 'GET',
                    params: args,
                }
            },
            providesTags: ['booking', 'car', 'user']
        }),
        updateUser: builder.mutation({
            query: (args) => {
                console.log(args, "args")
                return {
                    url: `/user/${args.id}`,
                    method: 'PUT',
                    body: args
                }
            },
            invalidatesTags: ['booking', 'car', 'user']
        }),
        getDriverRequests: builder.query({
            query: () => {
                return {
                    url: '/user/driver-requests',
                    method: 'GET',
                }
            },
            providesTags: ['user']
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: '/user/me',
                    method: 'GET',
                }
            },
            providesTags: ['user']
        }),
        changePassword: builder.mutation({
            query: (args) => {
                console.log(args, "args")
                return {
                    url: `/user/change-password`,
                    method: 'PUT',
                    body: args
                }
            },
            invalidatesTags: ['car', 'user']
        }),
    })
})

export const { useGetusersQuery, useChangePasswordMutation, useGetMeQuery, useUpdateUserMutation, useGetDriverRequestsQuery } = userApi