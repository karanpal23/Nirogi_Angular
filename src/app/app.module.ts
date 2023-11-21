import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { ObserversModule } from '@angular/cdk/observers';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule,} from '@angular/forms'
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule,} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatRadioModule} from '@angular/material/radio';
import { FirstCatogComponent } from './Components/first-catog/first-catog.component';
import {MatInputModule} from '@angular/material/input';
import { ThirdCatogComponent } from './Components/third-catog/third-catog.component';
import { SecondCatogComponent } from './Components/second-catog/second-catog.component';
import { FourthCatogComponent } from './Components/fourth-catog/fourth-catog.component';
import { FifthCatogComponent } from './Components/fifth-catog/fifth-catog.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AddUsersComponent } from './Components/add-users/add-users.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { SixthCatogComponent } from './Components/sixth-catog/sixth-catog.component';
import { MatTableModule } from '@angular/material/table';
import { RefFirstCategoryComponent } from './Components/ref-first-category/ref-first-category.component';
import { RefSecondCategoryComponent } from './Components/ref-second-category/ref-second-category.component';
import { RefThirdCategoryComponent } from './Components/ref-third-category/ref-third-category.component';
import { RefFifthCategoryComponent } from './Components/ref-fifth-category/ref-fifth-category.component';
import { RefFourthCategoryComponent } from './Components/ref-fourth-category/ref-fourth-category.component';
import { RefSixthCategoryComponent } from './Components/ref-sixth-category/ref-sixth-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectSearchModule } from 'mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatChipsModule } from '@angular/material/chips';
import { MyHttpInterceptor } from './http-interceptor';
import { InterceptorService } from './interceptor.service';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { AuthGuard } from './services/auth.guard';
import { SecondCatogPreviewComponent } from './View/second-catog-preview/second-catog-preview.component';
import { ThirdCatogPreviewComponent } from './View/third-catog-preview/third-catog-preview.component';
import { FourthCatogPreviewComponent } from './View/fourth-catog-preview/fourth-catog-preview.component';
import { FifthCatogPreviewComponent } from './View/fifth-catog-preview/fifth-catog-preview.component';
import { SixthCatogPreviewComponent } from './View/sixth-catog-preview/sixth-catog-preview.component';
import { FirstCatogPreviewComponent } from './View/first-catog-preview/first-catog-preview.component';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { CalculateAgePipeService } from './services/calculate-age-pipe.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MyModalComponent } from './Components/my-modal/my-modal.component';
import { DownloadReportProgressComponent } from './Components/PatientPage/download-report-progress/download-report-progress.component';
import { PendingLabReportsAlertComponent } from './Components/PopupModals/pending-lab-reports-alert/pending-lab-reports-alert.component';
import { LoginAlertComponent } from './Components/PopupModals/login-alert/login-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstCatogComponent,
    CalculateAgePipeService,
    ThirdCatogComponent,
    SecondCatogComponent,
    FourthCatogComponent,
    FifthCatogComponent,
    HomePageComponent,
    LoginPageComponent,
    AddUsersComponent,
    SixthCatogComponent,
    RefFirstCategoryComponent,
    RefSecondCategoryComponent,
    RefThirdCategoryComponent,
    RefFifthCategoryComponent,
    RefFourthCategoryComponent,
    RefSixthCategoryComponent,
    SecondCatogPreviewComponent,
    ThirdCatogPreviewComponent,
    FourthCatogPreviewComponent,
    FifthCatogPreviewComponent,
    SixthCatogPreviewComponent,
    FirstCatogPreviewComponent,
    MyModalComponent,
    DownloadReportProgressComponent,
    PendingLabReportsAlertComponent,
    LoginAlertComponent
   
    
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatChipsModule,
    AppRoutingModule,
    ScrollingModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMenuModule,
    
    ReactiveFormsModule,
    MatMomentDateModule,
    MatSelectSearchModule,
    NgbModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatTabsModule,
    ObserversModule,
    MatGridListModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    
    
  ],
  providers: [ 
    AuthGuard,
    ,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
   },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {provide: LocationStrategy,
     useClass: HashLocationStrategy,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
  
  {
   provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true
  }
   
],
  bootstrap: [AppComponent]
})
export class AppModule { }
