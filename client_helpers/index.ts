

import { feedFunc } from "./FeedFuncCl"

export const CL_comment = {
    //POST func

}

export const CL_allFeed = {
    //POST func
    POST_ONE: (value: any, tags: Array<string>) => feedFunc.createNewPost(value, tags),

    //MAKE A COMMENT
    POST_COMMENT: (postId: string, comment: string) => feedFunc.makeAComment(postId, comment),

}

export const CL_allUserFunc = {
   
}

export const CL_helpers = {
   //others...
}