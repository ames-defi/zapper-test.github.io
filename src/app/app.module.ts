import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectWalletButtonComponent } from './components/connect-wallet-button/connect-wallet-button.component';
import { ZapInComponent } from './components/zap-in/zap-in.component';
import { ZapOutComponent } from './components/zap-out/zap-out.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectWalletButtonComponent,
    ZapInComponent,
    ZapOutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
