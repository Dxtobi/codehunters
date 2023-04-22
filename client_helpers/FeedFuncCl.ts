
import axios, { AxiosRequestConfig } from "axios";

export let feedFunc = {
    createNewPost: async (values: any, tags: Array<string>) => {
        values.tags = tags
        try {
            const config: AxiosRequestConfig = {
                url: "/api/posts/new",
                data: values,
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {

        }
    },

    //MAKE A COMMENT:
    makeAComment: async (postId: string, comment: string) => {
        try {
            const config: AxiosRequestConfig = {
                url: `/api/posts/comments/${postId}`,
                data: { comment: comment.trim() },
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {
            console.log(error)
        }
    },

     //MAKE A COMMENT:
     getMorePosts: async (skip: any) => {
        try {
            const config: AxiosRequestConfig = {
                url: `/api/posts/feeds/${skip}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {
            console.log(error)
        }
    },

    //MAKE A COMMENT:
    deleteComment: async (commentId: string,) => {
        try {
            const config: AxiosRequestConfig = {
                url: `/api/posts/comments/delete/${commentId}`,
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {
            console.log(error)
        }
    },

    //DELETE A POST:
    deletePost: async (postId: string,) => {
        try {
            const config: AxiosRequestConfig = {
                url: `/api/posts/delete/${postId}`,
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {
            console.log(error)
        }
    }
}