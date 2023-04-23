
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';


export default async function (req:NextApiRequest, res:NextApiResponse) {
    try {
        console.log(req)
    } catch (error) {
        console.log(error)
        
    }
}