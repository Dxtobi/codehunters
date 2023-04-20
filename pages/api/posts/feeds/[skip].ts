
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { prismaInstance } from '../../../../lib/helpers/prismainit';



const prisma = prismaInstance

export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log('111111111111111111111111111111111111111111111111111111111111111111', req.query)
    try {
       const feeds = await prisma.post.findMany({orderBy: {id: "desc",}, take: 20, skip:parseInt(req.query?.skip as string), include: {user: true, responses:{
            include: {
              user: true,
            }
          },} },);
        return res.status(200).send(feeds)
    } catch (error) {
        return res.status(500).send({message:'error',})
    }
}