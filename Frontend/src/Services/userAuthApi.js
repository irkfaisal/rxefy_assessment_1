import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://127.0.0.1:8000/api/user` }),
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'register',
                    method: "POST",
                    body: user,
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: "login",
                    method: "POST",
                    body: user,
                    headers: {
                        'content-type': "application/json"
                    }
                }
            }
        }),
        sendPasswordResetEmail: builder.mutation({
            query: (email) => {
                return {
                    url: 'forgetpassword',
                    method: 'POST',
                    body: email,
                    headers: {
                        'content-type': "application/json"
                    }
                }
            }
        }),
        resetPassword: builder.mutation({
            query: ({ actualData, id, token }) => {
                return {
                    url: `resetpassword/${id}/${token}`,
                    method: 'POST',
                    body: actualData,
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            }
        }),
        getLoggedUserData: builder.query({
            query: (token) => {
                return {
                    url: 'userdata',
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        changePasswordWhileLogined: builder.mutation({
            query: ({ actualData, token }) => {
                return {
                    url: 'changepassword',
                    method: 'POST',
                    body: actualData,
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation, useGetLoggedUserDataQuery, useChangePasswordWhileLoginedMutation } = userAuthApi