import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    console.log(_req);
    res.status(200).json({hello: 'hello'})
}