import { prismaInstance } from "../prismainit"
import axios, {AxiosRequestConfig} from "axios";

export let feedFunc = {
    getFeeds:async (skip: any) => {
        try {
            const feeds = await prismaInstance.post.findMany({orderBy: {id: "desc",}, take: 20,  include: {user: true, responses:{
                include: {
                  user: true,
                }
              },} },);
            return feeds
        } catch (error) {
           console.log(error) 
        }
    },

    createNewPost: async (values: any, tags:Array<string>) => {
         values.tags = tags
         try {
             const config: AxiosRequestConfig = {
                 url: "/api/posts/new",
                 data: values,
                 method: "post",
                 headers: {
                     "Content-Type":"application/json"
                 }
             };
             const res = await axios(config)
         } catch (error) {
            
         }
     }
}