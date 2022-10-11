import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// My components
import { PageTemplateComponent } from './components/page-template/page-template.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ModalComponent } from './components/modal/modal.component';
import { BadOfHoldingComponent } from './components/bad-of-holding/main-page/bad-of-holding.component';
import { ItemComponent } from './components/bad-of-holding/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTemplateComponent,
    HomePageComponent,
    CalculatorComponent,
    AutocompleteComponent,
    ModalComponent,
    BadOfHoldingComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
