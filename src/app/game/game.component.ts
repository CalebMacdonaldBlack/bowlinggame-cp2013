import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';
import { ScoreCard } from '../models/score-card';
import { Score } from '../models/score';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  possiblePins: number[] = [];
  currentBowl: number;
  currentPlayer: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.gamesService.getGameFromId(id).then(game => {
        this.game = game;
        this.findPossiblePins();
      });
    });
  }

  onType() {
    console.log("type");

  }

  findPossiblePins(): void {
    let currentScoreCard: ScoreCard;
    for (let scorecard of this.game.scoreCards) {
      if (!scorecard.completed) {
        if (!currentScoreCard || currentScoreCard.scores.length > scorecard.scores.length) {
          currentScoreCard = scorecard;
          this.currentPlayer = scorecard.player.name;
        } else if(scorecard.scores[scorecard.scores.length - 1] && !scorecard.scores[scorecard.scores.length - 1].completed){
          currentScoreCard = scorecard;
          this.currentPlayer = scorecard.player.name;
          break;
        }
      }
    }

    let currentScore: Score = new Score([], false);
    for (let score of currentScoreCard.scores) {
      if (!score.completed) {
        currentScore = score;
        break;
      }
    }
    
    const possiblePinsCount = this.findRemainingPinsPossible(currentScore);
    this.currentBowl = currentScore.bowls.length + 1;
    this.possiblePins = [];
    for (let i = 0; i <= possiblePinsCount; i++) {
      this.possiblePins.push(i);
    }
  }

  findRemainingPinsPossible(score: Score): number {
    let possiblePins: number = 10;
    for (let bowl of score.bowls) {
      possiblePins -= bowl.pinsDown;
    }
    return possiblePins;
  }

  pinsDownClicked(count: number){
    console.log(count);
  }
}
