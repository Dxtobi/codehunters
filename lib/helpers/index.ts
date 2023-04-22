import { feedFunc } from './serverFunctions/feedsFunc';
import { userFuncs } from './serverFunctions/userFuncs';


//TODO this would be were all request functions are called from
//when refactoring the code......
//yes i know its a lazy approach but i m on a dead-line:

export const _comment = {
    //POST func

    //GET func

    //EDIT func

    //DELETE func
}

export const allFeed = {
    //POST func
    
    
    //GET func
    GET_POST: (skip: any) => feedFunc.getFeeds(skip),
    
    //GET ONE:
    GET_ONE: (id:string) => feedFunc.getOneFeed(id)
    //EDIT func

    //DELETE func
}

export const allUserFunc = {
    //GET_ME func
     GET_ME:(myId: string)=> userFuncs.getMyProfile(myId)
    //POST func

    //GET func

    //EDIT func

    //DELETE func
}

export const _helpers = {
   //others...
}