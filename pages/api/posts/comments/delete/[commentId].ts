
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../../../lib/helpers/prismainit';

const prisma = prismaInstance

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
    try {
        
        const session = await getSession({ req });
        const sessionUser = session?.user as User;
        const com = await prisma.response.findUnique({ where: { id: req.query.commentId as string } })

        if (!session || com?.userId != sessionUser?.id) {
            console.log(sessionUser?.id, com?.userId)
            return res.status(401).json({message:'unauthorized'})
        }
       
       // console.log(req.query, comment)
        
        
        const post = await prisma.response.delete({where: { id: req.query.commentId as string } });
        
        return res.status(200).json(com)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}