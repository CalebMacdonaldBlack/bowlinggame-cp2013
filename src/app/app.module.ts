import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }  from './app.routing';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GamesService } from './services/games.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ appRoutingProviders, GamesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
