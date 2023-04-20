import { prismaInstance } from "../prismainit"


export let userFuncs = {
    getMyProfile:async ( myId:string) => {
        const myProfile = await prismaInstance.user.findUnique({ where: { id: myId } });
        return myProfile
    },

    getOtherProfile:async ( userId:string) => {
        const myProfile = await prismaInstance.user.findUnique({ where: { id: userId } });
        return myProfile
    }
}