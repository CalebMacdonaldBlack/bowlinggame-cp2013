import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Router } from '@angular/router';

import { Game } from '../models/game';
import { Bowl } from '../models/bowl';
import { Player } from '../models/player';
import { ScoreCard } from '../models/score-card';
import { Score } from '../models/score';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  title: string;
  location: string;
  playerNames: string[];

  constructor(
    private gamesService: GamesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.playerNames = [""];
  }

  addNewPlayerClicked(){
    this.playerNames.push("");
  }

  nameInput(event: any, index: number){
    console.log(event.srcElement);
    
    this.playerNames[index] = event.srcElement.value;
  }

  createGameClicked(){
    this.gamesService.getGames().then(games => {

    const game: Game = new Game(
      games.length,
      this.location,
      this.title,
      []
    );

    for(let playerName of this.playerNames){
      game.scoreCards.push(new ScoreCard(
        new Player(playerName),
        [], false
      ))
    }

    this.gamesService.addGame(game);

    this.router.navigate(['/list-games', game.id]);
    });
  }

  deleteInputClicked(index: number){
    console.log(index);
    
    this.playerNames.splice(index, 1);
  }
}
