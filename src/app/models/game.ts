import { ScoreCard } from './score-card';

export class Game {
    constructor(public id: number, public title: string, public scoreCards: ScoreCard[]){}
}
