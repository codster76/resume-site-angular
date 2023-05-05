import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BadOfHoldingComponent } from './components/bad-of-holding/main-page/bad-of-holding.component';
import { RankerComponent } from './components/ranker/ranker.component';
import { DoneInTheFungeonComponent } from './components/done-in-the-fungeon/done-in-the-fungeon.component';
import { ArtAndMusicComponent } from './components/art-and-music/art-and-music.component';
import { MegaManEchoesComponent } from './components/mega-man-echoes/mega-man-echoes.component';
import { ZanatharsGuideComponent } from './components/zanathars-guide/zanathars-guide.component';
import { OnlineClassComponent } from './components/online-class/online-class.component';
import { ModalTestComponent } from './components/modal-test/modal-test.component';
import { PixelBordersComponent } from './components/pixel-borders/pixel-borders.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'bad-of-holding', component: BadOfHoldingComponent },
  { path: 'online-class', component: OnlineClassComponent },
  { path: 'ranker', component: RankerComponent },
  { path: 'done-in-the-fungeon', component: DoneInTheFungeonComponent },
  { path: 'art-and-music', component: ArtAndMusicComponent },
  { path: 'mega-man-echoes', component: MegaManEchoesComponent },
  { path: 'zanathars-guide', component: ZanatharsGuideComponent },
  { path: 'pixel-borders', component: PixelBordersComponent },
  { path: 'modal-test', component: ModalTestComponent }
];

// RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'});

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
