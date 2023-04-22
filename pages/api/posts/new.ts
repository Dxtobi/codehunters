
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../lib/helpers/prismainit';

const prisma = prismaInstance

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            title,
            points,
            message,
            image,
            link,
            tags,
            codes
        } = req.body
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({message:'not login'})
        }
        const sessionUser = session?.user as User;
        console.log(req.body)
        const post = await prisma.post.create({
            data: {
                title,
                message,
                image,
                link,
                codes_:codes,
                tags,
                created_at: `${Date.now()}`,
                points:points,
                user: {connect: {id: sessionUser?.id}}
            }
        });
    
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}