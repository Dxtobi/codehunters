import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';

const prisma = new PrismaClient()

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
    
        return res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}