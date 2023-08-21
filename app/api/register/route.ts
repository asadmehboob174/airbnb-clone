import { prismadb } from '@/lib/prismadb';
import { RegisterValidator } from '@/lib/validators/register';
import bcrypt from 'bcrypt'
import { z } from 'zod';

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method === 'POST') {
      const body = await req.json()
      const { username, email, password } = RegisterValidator.parse(body)
      // Check if the username or email already exists
      const existingUser = await prismadb.user.findFirst({
        where: {
          OR: [{ username: username }, { email: email }]
        }
      });

      if (existingUser) {
        return new Response('Username or email already exists', { status: 400 })
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 12);

      // Create the user in the database
      const newUser = await prismadb.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      return new Response('User created', { status: 201 })

    }
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data passed', { status: 422 })
    }

    return new Response('Could not create user, please try again later', { status: 500 })
  }

}