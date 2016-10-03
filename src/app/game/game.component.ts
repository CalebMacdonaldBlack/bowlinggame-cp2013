import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';
import { ScoreCard } from '../models/score-card';
import { Score } from '../models/score';
import { Bowl } from '../models/bowl';

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

  findPossiblePins(): void {
    let currentScoreCard: ScoreCard = this.getCurrentScoreCard();
    this.currentPlayer = currentScoreCard.player.name;
    if(!this.getCurrentScore(currentScoreCard) && currentScoreCard.scores.length === 10){
      this.game.isFinished = true;
      return;
    }
    let currentScore: Score = this.getCurrentScore(currentScoreCard) || new Score([], false);
    let possiblePinsCount = this.findRemainingPinsPossible(currentScore);
    this.currentBowl = currentScore.bowls.length + 1;
    this.possiblePins = [];
    if (possiblePinsCount <= 0) {
      possiblePinsCount = 10;
    }
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

  getCurrentScore(currentScoreCard: ScoreCard): Score {
    let currentScore;
    for (let score of currentScoreCard.scores) {
      if (!score.completed) {
        currentScore = score;
        break;
      }
    }
    return currentScore;
  }

  getCurrentScoreCard(): ScoreCard {
    let currentScoreCard: ScoreCard;
    for (let scorecard of this.game.scoreCards) {
      if (!scorecard.completed) {
        if (scorecard.scores[scorecard.scores.length - 1] && !scorecard.scores[scorecard.scores.length - 1].completed) {
          currentScoreCard = scorecard;
          break;
        } else if (!currentScoreCard || currentScoreCard.scores.length > scorecard.scores.length) {
          currentScoreCard = scorecard;
        }
      }
    }
    return currentScoreCard;
  }

  pinsDownClicked(pinsDown: number) {
    let currentScoreCard: ScoreCard = this.getCurrentScoreCard();
    let currentScore: Score = this.getCurrentScore(currentScoreCard);
    if (currentScore) {
      currentScore.bowls.push(new Bowl(pinsDown));
    } else {
      currentScore = new Score([new Bowl(pinsDown)], false);
      currentScoreCard.scores.push(currentScore);
    }

    if (currentScore.bowls.length == 2 && !(currentScoreCard.scores.length == 10 && (currentScore.bowls[1].pinsDown == 10 || currentScore.bowls[0].pinsDown + currentScore.bowls[1].pinsDown == 10))) {
      currentScore.completed = true;
    } else if (pinsDown == 10 && !(currentScore.bowls.length < 3 && currentScoreCard.scores.length == 10)) {
      currentScore.completed = true;
    }
    this.findPossiblePins();
  }

  calculateScore(scoreCard: ScoreCard): number {
    let totalScore: number = 0;
    for (let i = 0; i < scoreCard.scores.length; i++) {
      if (i === 9) {
        if (scoreCard.scores[i].bowls[0].pinsDown === 10) {
          totalScore += this.calculateStrike(scoreCard.scores, i, true);
        } else if (scoreCard.scores[i].bowls[0] && scoreCard.scores[i].bowls[1] && (scoreCard.scores[i].bowls[0].pinsDown + scoreCard.scores[i].bowls[1].pinsDown === 10)) {
          totalScore += this.calculateSpare(scoreCard.scores, i, true);
        } else {
          totalScore += this.calculateNormalFrame(scoreCard.scores, i);
        }
      } else {
        if (scoreCard.scores[i].bowls[0].pinsDown === 10) {
          totalScore += this.calculateStrike(scoreCard.scores, i, false);
        } else if (scoreCard.scores[i].bowls[0] && scoreCard.scores[i].bowls[1] && (scoreCard.scores[i].bowls[0].pinsDown + scoreCard.scores[i].bowls[1].pinsDown === 10)) {
          totalScore += this.calculateSpare(scoreCard.scores, i, false);
        } else {
          totalScore += this.calculateNormalFrame(scoreCard.scores, i);
        }
      }

    }
    return totalScore;
  }

  calculateStrike(scores: Score[], i: number, isFinal: boolean): number {
    if (!isFinal) {
      let totalScore = 10;
      let pinsDown = scores[i + 1] ? scores[i + 1].bowls[0].pinsDown : 0;
      totalScore += pinsDown;
      if (pinsDown == 10) {
        totalScore += scores[i + 2] ? scores[i + 2].bowls[0].pinsDown : 0;
      } else {
        totalScore += scores[i + 1] ? scores[i + 1].bowls[1] ? scores[i + 1].bowls[1].pinsDown : 0 : 0;
      }
      return totalScore;
    } else {
      if (scores[i - 1].bowls[0].pinsDown == 10) {
        return 20 + (scores[i].bowls[1] ? scores[i].bowls[1].pinsDown : 0) + (scores[i].bowls[2] ? scores[i].bowls[2].pinsDown : 0);
      } else {
        return 10 + (scores[i].bowls[1] ? scores[i].bowls[1].pinsDown : 0) + (scores[i].bowls[2] ? scores[i].bowls[2].pinsDown : 0);
      }
    }
  }

  calculateSpare(scores: Score[], i: number, isFinal: boolean): number {
    if (!isFinal) {
      return 10 + (scores[i + 1] ? scores[i + 1].bowls[0].pinsDown : 0);
    } else {
      return 10 + (scores[i].bowls[2] ? scores[i].bowls[2].pinsDown : 0);
    }
  }

  calculateNormalFrame(scores: Score[], i: number): number {
    try {
      return scores[i].bowls[0].pinsDown + scores[i].bowls[1].pinsDown;
    } catch (err) {
      return 0;
    }
  }
}
