
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../lib/helpers/prismainit';

const prisma = prismaInstance

export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
        const {
            topics,
            name,
        } = req.body;
        const session = await getSession({ req, });
        if (!session) {
            return res.status(401).json({message:'not login',})
        }
        const sessionUser = session?.user as User;
        const exist = await prisma.forum.count({where:{userId:sessionUser?.id}});
        if (exist > 0) {
            return res.status(401).json({message:'already have a group',})
        }
        const post = await prisma.forum.create({
            data: {
                name:name,
                topics:topics,
                userId:  sessionUser?.id,
            }
        });
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'error',})
    }
}