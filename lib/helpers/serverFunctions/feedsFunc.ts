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

    getOneFeed:async (id: string) => {
        try {
            const feeds = await prismaInstance.post.findUnique({ where: { id: id }, include: {user: true, responses:{include: { user: true }}}  });
            return feeds
        } catch (error) {
           console.log(error) 
        }
    },
}