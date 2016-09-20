import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Bowl } from '../models/bowl';
import { Player } from '../models/player';
import { ScoreCard } from '../models/score-card';
import { Score } from '../models/score';

let GAMES = [
  new Game(
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
            
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            
          )
        ]
      ),
      new ScoreCard(
        new Player("Dimitry"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            
          )
        ]
      ),
      new ScoreCard(
        new Player("Ryan"),
        [
          new Score(
            [
              new Bowl(2),
              new Bowl(8)
            ],
            
          ),
          new Score(
            [
              new Bowl(1),
              new Bowl(4)
            ],
            
          ),
          new Score(
            [
              new Bowl(2),
              new Bowl(5)
            ],
            
          ),
          new Score(
            [
              new Bowl(5),
              new Bowl(1)
            ],
            
          )
        ]
      )
    ]
  )
]

let gamesPromise = Promise.resolve(GAMES);

@Injectable()
export class GamesService {

  constructor() { }

  getGames() {
    return gamesPromise;
  }

}
