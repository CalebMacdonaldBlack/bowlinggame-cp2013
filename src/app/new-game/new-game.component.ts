import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  title: string;
  location: string;
  playerNames: string[];
  tempPlayerNames: string[];
  

  constructor() { }

  ngOnInit() {
    this.playerNames = this.tempPlayerNames = [""];
  }

  addNewPlayerClicked(){
    this.tempPlayerNames.push("");
    this.playerNames = this.tempPlayerNames;
    
  }

  nameInput(event: any, index: number){
    console.log();
    
    this.tempPlayerNames[index] = event.srcElement.value;
  }

  createGameClicked(){
    this.playerNames = this.tempPlayerNames;
    console.log(this.playerNames);
  }
}
