import { Answer, Game, Player, Question, Round } from '@prisma/client';

export type ResponseError = {
  message: string;
};

export type AnswerWithRelations = Answer & {
  player: Player;
};

export type RoundWithRelations = Round & {
  question: Question;
  answers: AnswerWithRelations[];
};

export type GameWithRelations = Game & {
  players: Player[];
  rounds: RoundWithRelations[];
};

export type VoteOption = {
  id: number | null;
  value: string;
  players: Player[];
};
