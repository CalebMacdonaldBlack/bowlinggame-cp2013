import { Player } from './player';
import { Score } from './score';

export class ScoreCard {
    constructor(public player:Player, public scores: Score[], public completed: boolean){}
}
