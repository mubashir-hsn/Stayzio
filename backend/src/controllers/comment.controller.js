import Comment from "../models/comment.model.js";

export const postComment = async (req, res) => {
    const { comment, userId, blogId } = req.body; 
    // Validate input fields
    if (!comment || !userId || !blogId) {
        return res.status(400).json({ message: 'All fields (comment, userId, blogId) are required.' });
    }

    try {
        let prevComment = await Comment.findOne({ userId, blogId });

        if (prevComment) {
            // Update the existing review
            prevComment.comment = comment;
        } 
        else{

             prevComment = new Comment({
                comment, 
                userId,    
                blogId  
            });

        }

        await prevComment.save();
        res.status(200).json({ message: 'Comment posted successfully.', comment: prevComment });

       
        
    } catch (error) {
        console.error('Error while posting comment:', error);
        res.status(500).json({ message: 'Failed to post comment.', error: error.message });
    }
};


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({})
            .populate({
                path: 'blogId',
                select: 'title coverImg' 
            })
            .populate({
                path: 'userId',
                select: 'fullName profileImg'
            });

        res.status(200).send(comments);
    } catch (error) {
        console.error("Error while getting comments: " + error);
        res.status(500).send({ message: "Failed to fetch comments." });
    }
};


export const countComment = async(req,res)=>{
    try {
        const comments = await Comment.countDocuments({})
        res.status(200).send({message: "Total comments count: ", comments: comments})
    } catch (error) {
        console.log("Error while count comments: " + error)
        res.status(500).send({message : "Failed to count comments."})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the comment by ID
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
};