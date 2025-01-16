import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { usePostCommentMutation } from '../redux/comment/comment';
import { useAuth } from '../contextApi/AuthProvider.jsx';

const PostComment = () => {
  const [coment, setComent] = useState('')
  const { authUser } = useAuth();
  const userId = authUser?.user?._id; 
  const { id } = useParams(); 
  const [postComment, {isLoading}] = usePostCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!coment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    if (!userId) {
      toast.error('Login required to add comment.');
      return;
    }
    if (!id) {
      toast.error('Blog ID is missing.');
      return;
    }

    try {
      // Post comment
      const response = await postComment({ comment: coment, userId: userId, blogId: id }).unwrap();
      toast.success('Comment posted successfully!');
      window.location.reload();
      setComent(''); 
    } catch (err) {
      toast.error('Failed to post comment.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="w-full h-auto">
      <h3 style={{ fontSize: '16px', fontWeight: '600' }} className="mb-4">
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={coment}
          onChange={(e) => setComent(e.target.value)}
          id="text"
          cols={30}
          rows={10}
          placeholder="Share your opinion about this blog..."
          className="bg-ws border-0 w-100 p-3 rounded-1"
          style={{ resize: 'none', outline: 'none' }}
        ></textarea>
        <button
          className="w-100 Btn py-2 rounded border-0 mt-1"
          style={{ backgroundColor: '#24befa', fontWeight: 'bold' }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PostComment;
