import Blog from "../models/blog.model.js";


// Create news
export const Create = async (req, res, next) => {
  const { title, descreption, category, image } = req.body;
  const slug = title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  
  const newBlog = new Blog({
    Blogname: title,
    descreption,
    category,
    Picture: image,
    slug,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

// Get all news
export const getblogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// Delete news
export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const Getblog= async(req,res,next)=>{
    const userId= req.params.id;
    Blog.findOne({ _id: userId }).then((blog) => {
        if (blog) {
          
          res.json(blog);
        } else {
          res.status(404).json({ message: 'Blog not found' });
        }
      }).catch((error) => {
        console.error('Database error:', error); 
        res.status(500).json({ message: 'Internal server error' });
      });
      
  
  }
  export const updateblog = async (req, res, next) => {
    try {
        // Ensure that all expected fields are received
        console.log("Request Body:", req.body);

        const updateblog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    Blogname: req.body.Blogname || '', 
                    descreption: req.body.descreption || '',
                    category: req.body.category || '',
                    Picture: req.body.Picture || '',
                },
            },
            { new: true } 
        );

        if (!updateblog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log("Updated Blog:", updateblog);
        res.status(200).json(updateblog);
    } catch (error) {
        console.error("Error in updating Blog:", error);
        next(error);
    }
};


  export const Delete= async(req,res,next)=>{
    let userId = req.params.id;
   
  Blog.findByIdAndDelete(userId)
  .then (() => {
  res.status (200).send({status: "event deleted"})
  }).catch((err) => {
  console.log(err);
  res.status (500). send({status: "Error with deleting data", error: err.message});
  })}


  export const getBlogBySlug = async (req, res, next) => {
    const { slug } = req.params;
  
    try {
      const blogItem = await Blog.findOne({ slug }); // Fetch by slug
      if (!blogItem) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(blogItem);
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      next(error);
    }
  };