/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TCar } from "../../../types/car.type";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query({
            query: (args?: any) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.keys(args).forEach((key) => {
                        const value = args[key];
                        if (value !== undefined && value !== null && value !== '' && value !== 'undefined') {
                            params.append(key, value.toString());
                        }
                    });
                }
                return {
                    url: '/cars',
                    method: 'GET',
                    params: params,
                }
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ['car']
        }),
        getSingleCar: builder.query({
            query: (id: string) => {
                return {
                    url: `/cars/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['car']
        }),
        createCar: builder.mutation({
            query: (carInfo) => {
                return {
                    url: `/cars`,
                    method: 'POST',
                    body: carInfo
                }
            },
            invalidatesTags: ['car'],
        }),
        deleteCar: builder.mutation({
            query: (id) => {
                return {
                    url: `/cars/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['car'],
        }),
        updateCar: builder.mutation({
            query: (args) => {
                console.log(args, "body");


                // // eslint-disable-next-line prefer-const, prefer-const
                let updateData: Record<string, unknown> = {}
                Object.keys(args.carPostData).forEach((key) => {
                    if (args.carPostData[key] !== undefined && args.carPostData[key] !== null && !Number.isNaN(args.carPostData[key])) {
                        updateData[key] = args.carPostData[key];
                    }
                });
                console.log(updateData, "updateData before appending to FormData");
                const formData = new FormData();
                formData.append('data', JSON.stringify(updateData));

                // Append image files if they exist
                if (args.images && args.images.length > 0) {
                    args.images.forEach((file: File) => formData.append('files', file));
                }
                console.log(formData.entries(), "carPostData")
                // console.log(carPostData, images, "images")

                return {
                    url: `/cars/${args?.carPostData.id}`,
                    method: 'PUT',
                    body: formData, // Pass formData as body
                };
            },
            invalidatesTags: ['car'],
        })



    }),
});

export const { useGetCarsQuery, useDeleteCarMutation, useUpdateCarMutation, useGetSingleCarQuery, useCreateCarMutation } = carApi;
