import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";



export const getBlogs = async (req, res) => {
    try {
        
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error while fetching blogs:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs.",
        });
    }
};


export const blogs = async(req,res)=>{
  const {search , category , location} = req.query
  try {
    let query = {};

    if (search) {
        query = {
            ...query,
            $or : [
               {title: {$regex : search , $options: 'i'}},
               {content: {$regex : search , $options: 'i'}}
            ]
        }
    }

    if (category) {
        query = {
            ...query,
            category
        }
    }
    
    if (location) {
        query = {
            ...query,
            location
        }
    }
    
    const blogs = await Blog.find(query).populate('author','email').sort({createdAt: -1});
    res.status(200).send(blogs)

  } catch (error) {
    console.log("Error while getting blog: " + error)
    res.status(500).send({message : "Failed to find blog."})
  }
}

// post new blog
export const createNewBlog = async(req,res)=>{
    try {
        const newBlog = new Blog({
            ...req.body,
            author: req.userId
        })
         await newBlog.save();
         if (!newBlog) {
            return res.status(401).send({message:"Failed to post blog"})
         }
      return res.status(200).send({message:"Blog created.", blog: newBlog})
        
    } catch (error) {
        console.log("Error while creating new blog: " + error)
        return res.status(500).send({message : "Failed to creating new blog."})
    }
}

export const getSingleBlog = async(req,res)=>{
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({message : "Blog not found"})
        }
        const comment = await Comment.find({blogId: blogId}).populate("userId",'fullName email profileImg')
        res.status(200).send({blog: blog ,comments: comment})

    } catch (error) {
        console.log("Error while fetching the  single blog: " + error)
        res.status(500).send({message: "Failed to fetch the blog."})
    }
}

// update blog
export const updateBlog = async(req,res)=>{
    try {
        const blogId = req.params.id
        const updateBlog = await Blog.findByIdAndUpdate(blogId,{...req.body},{new:true})
        if (!updateBlog) {
            res.status(404).send({message: "Blog not found."})
        }

        res.status(200).send({message: "Blog update successfully." , blog: updateBlog});

    } catch (error) {
        console.log("Error while update the  blog: " + error)
        res.status(500).send({message: "Failed to update the blog."})
    }
}

// delete blog

export const deleteBlog = async(req,res)=>{
    try {
        const blogId = req.params.id
        const deleteBlog = await Blog.findByIdAndDelete(blogId)
        if (!deleteBlog) {
            return res.status(404).send({message : "Product not found"})
        }
        await Comment.deleteMany({blogId: blogId});
        res.status(200).send({message: "Blog deleted successfully."})
    } catch (error) {
        console.log("Error while delete the  blog: " + error)
        res.status(500).send({message: "Failed to delete the blog."})
    }
}

// get related blogs

export const getRelatedBlogs = async (req, res) => {
    try {
        const blogId = req.params.id; // Correct destructuring
        if (!blogId) {
            return res.status(400).send({ message: "Blog ID is required." });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ message: "Blog not found." });
        }

        const titleRegex = new RegExp(
            blog.title.split(" ").join("|"),
            "i"
        );

        const relatedQuery = {
            _id: { $ne: blogId }, // Exclude the current blog
            title: { $regex: titleRegex }, // Find blogs with similar titles
        };

        const relatedBlogs = await Blog.find(relatedQuery);

        return res.status(200).send(relatedBlogs); // Use `return` to prevent further execution
    } catch (error) {
        console.error("Error while fetching the related blogs:", error);
        return res.status(500).send({ message: "Failed to fetch related blogs." });
    }
};
