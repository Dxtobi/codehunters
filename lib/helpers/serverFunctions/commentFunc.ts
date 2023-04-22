import { prismaInstance } from "../prismainit"
import axios, {AxiosRequestConfig} from "axios";

export let commentFuncs = {
    
    addNewComment: async (values: any, tags: Array<string>) => {
        console.log('hitting comment')
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