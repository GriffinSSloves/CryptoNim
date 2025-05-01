import { Player } from './Player';

export type Game = {
  gameId: bigint; // uint256 maps well to bigint
  rows: bigint[]; // uint[] maps to bigint[]
  playerOneTurn: boolean; // bool maps to boolean
  playerOne: Player;
  playerTwo: Player;
  winner: Player;
  lastUpdatedAt: number; // uint48 fits within JavaScript's number type safely
};
