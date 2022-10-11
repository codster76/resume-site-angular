import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BadOfHoldingComponent } from './components/bad-of-holding/main-page/bad-of-holding.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'bad-of-holding', component: BadOfHoldingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
