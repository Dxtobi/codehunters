
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../../lib/helpers/prismainit';

const prisma = prismaInstance

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            comment
        } = req.body
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({message:'not login'})
        }
        const sessionUser = session?.user as User;
       // console.log(req.query, comment)
        const post = await prisma.response.create({
            data: {
                message:comment.trim(),
                created_at : `${Date.now()}`,
                user: { connect: { id: sessionUser?.id } },
                post:{ connect: { id: req.query.postId as string } },
            }
        });
    
        const com= await prisma.response.findUnique({ where: { id: post.id }, include: {user: true}  })
        return res.status(200).json(com)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}