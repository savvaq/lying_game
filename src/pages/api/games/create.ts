// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Game } from '@prisma/client';
import { uid } from 'uid';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game>
) {
  const name = req.query.name as string;

  await prisma.question.create({
    data: {
      language: 'en',
      text: 'What is the capital of France?',
      answer: 'Paris',
    },
  });

  const randomQuestionId =
    await prisma.$queryRaw`SELECT id FROM Question WHERE language = 'en' ORDER BY RAND() LIMIT 1`;

  console.log(randomQuestionId);
  return;

  const game = await prisma.game.create({
    data: {
      code: uid(6).toUpperCase(),
    },
    include: {
      players: true,
    },
  });

  const player = await prisma.player.create({
    data: {
      name,
      gameId: game.id,
      isHost: true,
    },
  });

  game.players = [player];

  res.status(200).json(game);
}
