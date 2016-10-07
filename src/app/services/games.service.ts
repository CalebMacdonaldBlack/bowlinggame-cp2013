import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Bowl } from '../models/bowl';
import { Player } from '../models/player';
import { ScoreCard } from '../models/score-card';
import { Score } from '../models/score';
import { FirebaseService } from './firebase.service';

let GAMES = [
  new Game(
    0,
    "Townsville Bowling Alley",
    "game 1",
    [
      new ScoreCard(
        new Player("Caleb"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            true
          )
        ],
        false
      ),
      new ScoreCard(
        new Player("Dimitry"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            true
          )
        ],
        false
      ),
      new ScoreCard(
        new Player("Ryan"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            false
          )
        ],
        false
      )
    ],
    false
  ),
  new Game(
    1,
    "Ten pin bowling",
    "Friday night",
    [
      new ScoreCard(
        new Player("David"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(5)
            ],
            true
          )
        ],
        false
      ),
      new ScoreCard(
        new Player("Dimitry"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            true
          )
        ],
        false
      ),
      new ScoreCard(
        new Player("Ryan"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            true
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            true
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            true
          ),
          new Score(
            [
              new Bowl(10)
            ],
            true
          )
        ],
        false
      )
    ],
    false
  )
]

let gamesPromise = Promise.resolve(GAMES);

@Injectable()
export class GamesService {

  games: Game[];

  constructor(private firebaseService: FirebaseService) {
  }


  getGameFromId(id: string | number) {
    return this.getGames()
      .then(games => games.find(game => game.id === id));
  }

  addGame(game: Game): Promise<any> {
    return this.getGames().then(games => {
      games.push(game);
        return this.save(games);
    });
  }

  save(games: Game[]) {
    return new Promise((resolve, reject) => {
      this.firebaseService.setData(games)
        .subscribe(
        response => {resolve(response.data)},
        error => reject(error)
        );
    });
  }

  updateGame(updatedGame: Game){
    const context = this;
    this.getGames().then(games => {
      for(let i=0;i<games.length;i++){
        if (games[i].id === updatedGame.id){
          games[i] = updatedGame;
          this.save(games);
          break;
        }
      }
    });
  }

  getGames(): Promise<Game[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getData()
        .subscribe(
        response => {
          for(let game of response.data){
            for(let scoreCard of game.scoreCards){
              if(!scoreCard.scores){
                scoreCard.scores = []
              }
            }
          }
          resolve(response.data)
        },
        error => reject(error)
        );
    });
  }
}
