
import axios, { AxiosRequestConfig } from "axios";

export let forumFunc = {
    createNewForum: async (values: any, ) => {
        try {
            const config: AxiosRequestConfig = {
                url: "/api/forum/createforum",
                data: values,
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const res = await axios(config)
            return res
        } catch (error) {
            console.error(error)
        }
    },

   
}