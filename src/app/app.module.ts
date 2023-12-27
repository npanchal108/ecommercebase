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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SEOService } from './services/seo.service';
import { ContactService } from './services/contact.service';
import { LoadingService } from './services/loading.service';
import { DataService } from './services/data.service';
import { CartService } from './services/cart.service';
//import { sharedModule } from './model/shared.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegistrationService } from './services/registration.service';
import { ToastrModule } from 'ngx-toastr';
import { MenuService } from './services/menu.service';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { RoutingState } from './services/routingState';
import { DemoService } from './services/demo.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
//import { FloorPipe, MillionPipe, weburlPipe } from '../app/services/MillionPipe';
import { sharedModule } from '../app/model/shared.module';
import { ImageSliderComponent } from './common/image-slider/image-slider.component';
import { LocalStorage } from './model/common.model';
import { OrderManagementService } from './services/order-management.service';
import { CheckoutService } from './services/checkout.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    TypeaheadComponent,
    // MillionPipe,
    // FloorPipe,
    // weburlPipe
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
    NgxExtendedPdfViewerModule,
    ImageSliderComponent,
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
    HttpClient,
    { provide: LocalStorage, useFactory: localStorageFactory },
    
    SEOService,
    ContactService,
    LoadingService,
    DataService,
    CartService,
    RegistrationService,
    MenuService,
    DecimalPipe,
    RoutingState,
    DemoService,
    OrderManagementService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function localStorageFactory() {
  return localStorage;
}