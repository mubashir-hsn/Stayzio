import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4001/api/',
        credentials: 'include'
    }),
    endpoints: (builder)=>({
        fetchBlogs: builder.query({
            query: ({search='',category='',location=''})=> `/blogs?search=${search}&category=${category}&location=${location}`
        }),
        fetchAllBlogs: builder.query({
            query: ()=> `/blogs/getblogs`
        }),
        fetchBlogById: builder.query({
            query: (id)=> `/blogs/${id}`
        }),
        fetchRelatedBlogs: builder.query({
            query: (id)=> `/blogs/related-blogs/${id}`
        }),
        postBlog : builder.mutation({
            query: (newBlog)=>({
                url : '/blogs/create-blog',
                method : "POST",
                body : newBlog,
                credentials : "include"
                }),
                invalidatesTags: (result , error, {id})=> [{type: 'Blogs',id}]   
        }),
        deleteBlog : builder.mutation({
            query: (id)=>({
                url : `/blogs/delete-blog/${id}`,
                method : "DELETE",
                credentials : "include"
                }),
             invalidatesTags: (result , error, {id})=> [{type: 'Blogs',id}]   
        }),
        updateBlog : builder.mutation({
            query: ({id, ...rest})=>({
                url : `/blogs/update-blog/${id}`,
                method : "PATCH",
                body: rest,
                credentials : "include"
                }),
             invalidatesTags: (result , error, {id})=> [{type: 'Blogs',id}]   
        })
    })
})

export const {useFetchBlogsQuery , useFetchBlogByIdQuery,usePostBlogMutation, useDeleteBlogMutation , useUpdateBlogMutation,useFetchAllBlogsQuery , useFetchRelatedBlogsQuery} = blogApi