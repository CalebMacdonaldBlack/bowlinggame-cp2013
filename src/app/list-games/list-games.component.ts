import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  games: Game[];

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.gamesService.getGames()
          .then(games => this.games = games);
  }

}
