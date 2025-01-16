import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4001/api/comments',
        credentials: 'include'
    }),
    endpoints: (builder)=>({
        postComment: builder.mutation({
            query: (coment)=> (
                {
                    url: "/post-comment",
                    method:"POST",
                    body: coment
                }
            )
        }),
       getComments: builder.query({
        query: ()=> '/get-comments'
       }),
       deleteComment : builder.mutation({
        query: (id)=>({
            url : `/delete/${id}`,
            method : "DELETE",
            credentials : "include"
            }),
    }),

    })
})

export const {usePostCommentMutation , useGetCommentsQuery , useDeleteCommentMutation} = commentApi
export default commentApi