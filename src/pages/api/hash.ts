import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Return hashed input
    res.status(200).json({
        hash: await bcrypt.hash(req.body.input, 10),
    });
}