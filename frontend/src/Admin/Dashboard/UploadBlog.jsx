import React, { useState , useRef , useEffect } from 'react'
import NavDashboard from './NavDashboard.jsx'
import { useAuth } from '../../contextApi/AuthProvider.jsx'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { usePostBlogMutation } from '../../redux/blog/blogApi.js';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const UploadBlog = () => {
  const editorRef = useRef(null)
  const [title, setTitle] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  const {authUser} = useAuth();
 const navigate = useNavigate();

  const [postBlog , {isLoading}] = usePostBlogMutation();

  useEffect(()=>{
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: ()=>{
        editorRef.current = editor
      },
      autofocus:true,
      tools: { 
        header: {
          class: Header, 
          inlineToolbar: true 
        }, 
        list: { 
          class: List, 
          inlineToolbar: true 
        } 
      }
    });

    return ()=>{
      editor.destroy();
      editorRef.current = null;
    }

  },[])

   const handleSubmit =  async (e) => {
    e.preventDefault(); 
      try {
        const content = await editorRef.current.save();
      //  console.log(content)
        const newPost = {
          title,
          description,
          content,
          coverImg,
          category,
          rating,
          author : authUser?.user?._id
        }

        const response = await postBlog(newPost).unwrap();
        console.log(response)
        toast.success("Blog posted successfully.")
        navigate('/admin/dashboard')

      } catch (error) {
        toast.error("Failed to post blog.", error.data.message)
        console.log("Failed to post blog: ", error)
      }
   }

  return (
    <>
      <div>
        <NavDashboard />
        <div>
          <div className=''>
            <div className="container p-4 bg-white shadow-sm rounded-3" style={{ marginTop: "6rem" }}>
              <h3 className="p-3 border-1 border-bottom mb-3"> Create a new Blog</h3>

              <div className='mt-5'>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="" className='fw-medium'>
                      Blog Title:
                    </label>
                    <input type="text" className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                      placeholder='Ex: Marine Del Rey Marriot.....'
                      style={{ outline: "none", fontSize: "13px" }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className='row mt-3'>

                    {/* left side */}
                    <div className='col-md-7 p-2 p-md-3'>
                      <p className='fw-semibold' style={{ fontSize: "20px" }}>Content Section</p>
                      <p className='fw-medium fst-italic' style={{ fontSize: "13px" }}>Write your post below here:</p>
                      <div id='editorjs'></div>
                    </div>

                    {/* right side */}
                    <div className='col-md-5 p-2 p-md-3 border-1 border'>
                      <p className='fw-semibold' style={{ fontSize: "20px" }}>Choose blog format</p>
                      {/* blog image */}
                      <div className='mt-2'>
                        <label htmlFor="" className='fw-semibold' style={{fontSize:"15px"}}>
                          Blog Cover:
                        </label>
                        <input type="text" className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                          placeholder='https://www.pexel.com/img/jkdiu....'
                          style={{ outline: "none", fontSize: "13px" }}
                          value={coverImg}
                          onChange={(e) => setCoverImg(e.target.value)}
                        />
                      </div>
                      {/* blog category */}
                      <div className='mt-2'>
                        <label htmlFor="" className='fw-semibold' style={{fontSize:"15px"}}>
                          Category:
                        </label>
                        <input type="text" className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                          placeholder='Rooftop/Travel/Nature'
                          style={{ outline: "none", fontSize: "13px" }}
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      {/* blog description */}
                      <div className='mt-2'>
                        <label htmlFor="" className='fw-semibold' style={{fontSize:"15px"}}>
                          Meta Description:
                        </label>
                        <textarea cols={4} rows={4} type="text" className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                          placeholder='Write your own description...'
                          style={{ outline: "none", fontSize: "13px" , resize:"none"}}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      {/* blog rating */}
                      <div className='mt-2'>
                        <label htmlFor="" className='fw-semibold' style={{fontSize:"15px"}}>
                          Rating:
                        </label>
                        <input  type="number" className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                          placeholder='0'
                          style={{ outline: "none", fontSize: "13px" , resize:"none"}}
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        />
                      </div>
                      {/* blog auther */}
                      <div className='mt-2'>
                        <label htmlFor="" className='fw-semibold' style={{fontSize:"15px"}}>
                          Author:
                        </label>
                        <input  type="text" disabled className='w-100 my-2 py-3 rounded-2 px-3 bg-light border-0' required
                          style={{ outline: "none", fontSize: "15px" , resize:"none"}}
                          value={authUser?.user?.fullName}
                        />
                      </div>


                    </div>
                  
                  </div>

                  <button disabled={isLoading} type='submit' className='w-100 py-2 rounded-2 mt-3 text-center fw-bold bg-dark text-white'>Add New Blog</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadBlog