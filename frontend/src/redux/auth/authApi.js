import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4001/api/users',
        credentials: 'include'
    }),
    endpoints: (builder)=>({
        register: builder.mutation({
            query: (NewUser)=> (
                {
                    url: "/signup",
                    method:"POST",
                    body: NewUser
                }
            )
        }),
        login: builder.mutation({
            query: (credentials)=> (
                {
                    url: "/login",
                    method:"POST",
                    body: credentials
                }
            )
        }),
        logout: builder.mutation({
            query: ()=> (
                {
                    url: "/logout",
                    method:"POST",
                }
            )
        }),
        getAllUsers: builder.query({
            query: ()=> ({
                    url: "/all-users",
                    method:"GET",
                }),
        }),
        deleteUser: builder.mutation({
            query: (id)=> (
                {
                    url: `/delete-user/${id}`,
                    method: "DELETE"
                }
            )
        }),
        updateUserRole: builder.mutation({
            query: ({id,role})=> (
                {
                    url: `/user-role/${id}`,
                    method: "PUT",
                    body: {role}
                }
            ),
            refetchOnMount: true,
            invalidatesTags: ["Users"],
        }),


    })
})

export const {useRegisterMutation, useLoginMutation , useLogoutMutation , useGetAllUsersQuery ,useDeleteUserMutation , useUpdateUserRoleMutation} = authApi

export default authApi