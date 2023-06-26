import { Square } from "./Square";

export type cellBoard = { num: number; square: null | Square };
export type rowBoard = cellBoard[];
export type BoardArray = rowBoard[];
