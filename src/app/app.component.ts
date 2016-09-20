import { Component, OnInit } from '@angular/core';
import { GamesService } from './services/games.service';
import { Game } from './models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  games: Game[];

  constructor(
    private gamesService: GamesService,
    private router: Router
    ){}

  ngOnInit() {
    this.gamesService.getGames()
          .then(games => this.games = games);
  }

  onSelect(game: Game){
    this.router.navigate(['/list-games', game.id]);
  }
}
