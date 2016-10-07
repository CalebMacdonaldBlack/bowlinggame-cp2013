import { Game } from '../models/game';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class FirebaseService {

    constructor(private http: Http) {};

    setData(games: Game[]){
        const body = JSON.stringify({data: games});
        return this.http.put("https://bowlingtracker-a1960.firebaseio.com/games.json", body)
        .map(response => response.json());
    }

    getData(){
        return this.http.get("https://bowlingtracker-a1960.firebaseio.com/games.json")
            .map(response => response.json() );
    }
}