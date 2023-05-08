// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../../prisma/client";
import { User } from "@prisma/client";

type Data = {
  userPosts: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);

  const userPosts = await prisma.user.findUnique({
    where: {
      // @ts-ignore:next-line
      email: session?.user?.email,
    },
    include: {
      posts: true,
    },
  });

  res.status(200).json({ userPosts });
}
