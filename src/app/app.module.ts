import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';

// My components
import { PageTemplateComponent } from './components/page-template/page-template.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ModalComponent } from './components/modal/modal.component';
import { BadOfHoldingComponent } from './components/bad-of-holding/main-page/bad-of-holding.component';
import { ItemFormComponent } from './components/bad-of-holding/item-form/item-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RankerComponent } from './components/ranker/ranker.component';
import { DoneInTheFungeonComponent } from './components/done-in-the-fungeon/done-in-the-fungeon.component';
import { ArtAndMusicComponent } from './components/art-and-music/art-and-music.component';
import { MegaManEchoesComponent } from './components/mega-man-echoes/mega-man-echoes.component';
import { ZanatharsGuideComponent } from './components/zanathars-guide/zanathars-guide.component';
import { OnlineClassComponent } from './components/online-class/online-class.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTemplateComponent,
    HomePageComponent,
    CalculatorComponent,
    AutocompleteComponent,
    ModalComponent,
    BadOfHoldingComponent,
    ItemFormComponent,
    RankerComponent,
    DoneInTheFungeonComponent,
    ArtAndMusicComponent,
    MegaManEchoesComponent,
    ZanatharsGuideComponent,
    OnlineClassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
