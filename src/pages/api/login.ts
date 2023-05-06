import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Parse body
    const { password, username } = req.body;

    // Check values
    const usernameVerified = username === process.env.AUTH_USERNAME;
    const passwordVerified = password && (await bcrypt.compare(password, process.env.AUTH_PASSWORD || ''));

    // Return token
    res.status(200).json({
        token: (usernameVerified && passwordVerified) ? jwt.sign(req.body, process.env.AUTH_SECRET || '') : null,
    });
}