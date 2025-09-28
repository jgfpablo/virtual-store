import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ComponentsModule } from './components/components.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule {}
