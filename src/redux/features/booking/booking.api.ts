import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingInfo) => ({
                url: '/bookings',
                method: 'POST',
                body: bookingInfo
            }),
            invalidatesTags: ['booking', 'car']
        }),
        getBooking: builder.query({
            query: (args) => {
                return {
                    url: '/bookings',
                    method: 'GET',
                    params: args,
                }
            },
            providesTags: ['booking', 'car']
        }),
        updateBooking: builder.mutation({
            query: (args) => {
                return {
                    url: `/bookings/${args.id}`,
                    method: 'PUT',
                    body: args.body
                }
            },
            invalidatesTags: ['booking', 'car']
        }),
        returnCarBooking: builder.mutation({
            query: (args) => {
                return {
                    url: `/cars/return`,
                    method: 'PUT',
                    body: args
                }
            },
            invalidatesTags: ['booking', 'car']
        }),
        getMyBooking: builder.query({
            query: (args) => {
                return {
                    url: '/bookings/my-bookings',
                    method: 'GET',
                    params: args,
                }
            },
            providesTags: ['booking']
        }),
        getDriverBookings: builder.query({
            query: (args) => {
                return {
                    url: '/bookings/driver-bookings',
                    method: 'GET',
                    params: args,
                }
            },
            providesTags: ['booking']
        }),
        getUnassignedBookings: builder.query({
            query: (args) => {
                return {
                    url: '/bookings/unassigned-bookings',
                    method: 'GET',
                    params: args,
                }
            },
            providesTags: ['booking']
        }),
        claimBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/claim/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['booking']
        }),
        deleteBooking: builder.mutation({
            query: (args) => {
                return {
                    url: `/bookings/${args.id}`,
                    method: 'DELETE',
                    params: args,
                }
            },
            invalidatesTags: ['booking'],
        }),
    })
})

export const { 
    useCreateBookingMutation, 
    useDeleteBookingMutation, 
    useGetMyBookingQuery, 
    useReturnCarBookingMutation, 
    useGetBookingQuery, 
    useUpdateBookingMutation,
    useGetDriverBookingsQuery,
    useGetUnassignedBookingsQuery,
    useClaimBookingMutation
} = bookingApi;