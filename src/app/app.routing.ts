import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameComponent } from './new-game/new-game.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { GameComponent } from './game/game.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: 'list-games', component: ListGamesComponent },
  { path: 'list-games/:id', component: GameComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);