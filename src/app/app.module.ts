import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { environment } from '../environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SEOService } from './services/seo.service';
import { ContactService } from './services/contact.service';
import { LoadingService } from './services/loading.service';
import { DataService } from './services/data.service';
import { CartService } from './services/cart.service';
import { sharedModule } from './model/shared.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegistrationService } from './services/registration.service';
import { ToastrModule } from 'ngx-toastr';
import { MenuService } from './services/menu.service';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RoutingState } from './services/routingState';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    TypeaheadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    sharedModule,
    RecaptchaModule,
    GoogleTagManagerModule.forRoot({
      id: environment.ga,
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      }),
      NgbTypeaheadModule,
  ],
  providers: [
    provideClientHydration(),
    SEOService,
    ContactService,
    LoadingService,
    DataService,
    CartService,
    RegistrationService,
    MenuService,
    DecimalPipe,
    RoutingState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
