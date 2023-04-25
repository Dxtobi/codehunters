

import { feedFunc } from "./FeedFuncCl"
import { forumFunc } from "./forum"

export const CL_allFeed = {
    //POST func
    POST_ONE: (value: any, tags: Array<string>) => feedFunc.createNewPost(value, tags),

    //MAKE A COMMENT
    POST_COMMENT: (postId: string, comment: string) => feedFunc.makeAComment(postId, comment),

    //DELETE A COMMENT
    DELETE_COMMENT: (commentId: string) => feedFunc.deleteComment(commentId),

    //DELETE A POST
    DELETE_POST: (postId: string) => feedFunc.deletePost(postId),

    //GET_MORE_POST
    GET_MORE_POST: (skip: any) => feedFunc.getMorePosts(skip),
}

export const CL_forumFunc = {
    //POST func
    CREATE_FORUM: (value: any) => forumFunc.createNewForum(value)


}


export const CL_allUserFunc = {
   
}

export const CL_helpers = {
   //others...
}