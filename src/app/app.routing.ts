import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameComponent } from './new-game/new-game.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'new-game', component: NewGameComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);