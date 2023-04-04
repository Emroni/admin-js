import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check values
    const username = req.body.username === process.env.AUTH_USERNAME;
    const password = await bcrypt.compare(req.body.password, process.env.AUTH_PASSWORD || '');

    // Return token
    res.status(200).json({
        token: (password && username) ? jwt.sign(req.body, process.env.AUTH_SECRET || '') : null,
    });
}