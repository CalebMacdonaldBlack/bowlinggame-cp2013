import { ScoreCard } from './score-card';

export class Game {
    constructor(public id: number, public location: string, public title: string, public scoreCards: ScoreCard[], public isFinished: boolean){}
}
