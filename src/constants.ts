export type MatchDetails = {
  player1?: number;
  p1Nickname: string;
  player2?: number;
  p2Nickname: string;
  winningCount: number;
};

export const MATCH_DETAILS: MatchDetails = {
  player1: undefined,
  p1Nickname: "Team 1",
  player2: undefined,
  p2Nickname: "Team 2",
  winningCount: 4,
};
