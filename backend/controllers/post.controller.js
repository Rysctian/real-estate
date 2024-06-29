import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"


export const getPosts = async (req, res) => {
    const query = req.query;
  
    try {
      const posts = await prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: parseInt(query.bedroom) || undefined,
          bathroom: parseInt(query.bathroom) || undefined,
          price: {
            gte: parseInt(query.minPrice) || undefined,
            lte: parseInt(query.maxPrice) || undefined,
          },
        },
        include: {
          postDetail: true, 
        },
      });
  
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to get posts" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        email: true,
                        contactNumber: true
                    },
                },
            },
        });

        const token = req.cookies?.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (err) {
                    throw err; // Handle JWT verification error
                }

                const saved = await prisma.savedPost.findUnique({
                    where: {
                        userId_postId: {
                            postId: id,
                            userId: payload.id,
                        },
                    },
                });

                res.status(200).json({ ...post, isSaved: saved ? true : false });
            });
        } else {
            res.status(200).json({ ...post, isSaved: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get post' });
    }
};

export const addPost = async (req, res) => {
    const { title, price, images, address, city, property, type, bedroom, bathroom, longitude, latitude, sqft, postDetails } = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                user: {
                    connect: {
                        id: tokenUserId,
                    },
                },
                postDetail: {
                    create: {
                        ...postDetails,
                    },
                },
                price,
                images,
                address,
                city,
                property,
                type,
                bedroom,
                bathroom,
                longitude,
                latitude,
                sqft,
            },
        });

        res.json(newPost);
    } catch (error) {
        console.error("Error adding post:", error);
        res.status(500).json({ error: "Could not add post." });
    }
};

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { title, price, images, address, city, property, type, bedroom, bathroom, longitude, latitude, size, postDetails } = req.body;
  
    try {
      const existingPost = await prisma.post.findUnique({
        where: { id },
        include: { postDetail: true },
      });
  
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found!" });
      }
  
      if (existingPost.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
      }
  
      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title,
          price,
          images,
          address,
          city,
          property,
          type,
          bedroom,
          bathroom,
          longitude,
          latitude,
          postDetail: {
            update: {
              ...postDetails,
            },
          },
        },
      });
  
      res.json(updatedPost);
    } catch (err) {
      console.error('Error updating post:', err);
      res.status(500).json({ message: "Failed to update post!" });
    } finally {
      await prisma.$disconnect();
    }
};
  

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const tokenUserId = req.userId;
  
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { postDetail: true, savedPosts: true, bookings: true }
      });
  
      if (!post) {
        return res.status(404).json({ message: "Post not found!" });
      }
  
      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized!" });
      }
  
      if (post.savedPosts && post.savedPosts.length > 0) {
        await prisma.savedPost.deleteMany({
          where: { postId: postId },
        });
      }
  
      if (post.bookings && post.bookings.length > 0) {
        await prisma.booking.deleteMany({
          where: { postId: postId },
        });
      }
  
      if (post.postDetail) {
        await prisma.postDetail.delete({
          where: { id: post.postDetail.id },
        });
      }
  
      await prisma.post.delete({
        where: { id: postId },
      });
  
      res.status(200).json({ message: "Post Deleted" });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post!" });
    }
  };
  

