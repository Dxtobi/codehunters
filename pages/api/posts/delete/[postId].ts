
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../../lib/helpers/prismainit';


const prisma = prismaInstance

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
    try {
        
        const session = await getSession({ req });
        const sessionUser = session?.user as User;
        const com = await prisma.post.findUnique({ where: { id: req.query.postId as string } })

        if (!session || com?.userId != sessionUser?.id ) {
            return res.status(401).json({message:'unauthorized'})
        }
       
       // console.log(req.query, comment)
        
        const commentsRes = await prisma.response.deleteMany({ where: { postId: req.query.postId as string } });
        
        const post = await prisma.post.delete({where: { id: req.query.postId as string } });
        
        return res.status(200).json(com)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}