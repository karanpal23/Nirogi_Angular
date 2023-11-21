import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './Components/add-users/add-users.component';
import { FifthCatogComponent } from './Components/fifth-catog/fifth-catog.component';
import { FirstCatogComponent } from './Components/first-catog/first-catog.component';
import { FourthCatogComponent } from './Components/fourth-catog/fourth-catog.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { SecondCatogComponent } from './Components/second-catog/second-catog.component';
import { ThirdCatogComponent } from './Components/third-catog/third-catog.component';
import { AuthGuard } from './services/auth.guard';
import { SixthCatogComponent } from './Components/sixth-catog/sixth-catog.component';
import { RefFirstCategoryComponent } from './Components/ref-first-category/ref-first-category.component';
import { RefSecondCategoryComponent } from './Components/ref-second-category/ref-second-category.component';
import { RefThirdCategoryComponent } from './Components/ref-third-category/ref-third-category.component';
import { RefFourthCategoryComponent } from './Components/ref-fourth-category/ref-fourth-category.component';
import { RefFifthCategoryComponent } from './Components/ref-fifth-category/ref-fifth-category.component';
import { RefSixthCategoryComponent } from './Components/ref-sixth-category/ref-sixth-category.component';
import { FirstCatogPreviewComponent } from './View/first-catog-preview/first-catog-preview.component';
import { SecondCatogPreviewComponent } from './View/second-catog-preview/second-catog-preview.component';
import { ThirdCatogPreviewComponent } from './View/third-catog-preview/third-catog-preview.component';
import { FourthCatogPreviewComponent } from './View/fourth-catog-preview/fourth-catog-preview.component';
import { FifthCatogPreviewComponent } from './View/fifth-catog-preview/fifth-catog-preview.component';
import { SixthCatogPreviewComponent } from './View/sixth-catog-preview/sixth-catog-preview.component';


const routes: Routes = [
  {
 
    path:'',
    component:HomePageComponent,
    canActivate:[AuthGuard],
    

  
  },
  {
 
    path:'home',
    component:HomePageComponent,
    canActivate:[AuthGuard],
   

  
  },
  {
 
    path:'login',
    component:LoginPageComponent,
    
  
  },

{
  path:'add-user',
  component:AddUsersComponent,
  canActivate:[AuthGuard],
  
},

  
{
  path:'Category I (0-6 months)',
  component:FirstCatogComponent,
  canActivate:[AuthGuard],



},
{
  path:'Category-I (0-6 months)',
  component:RefFirstCategoryComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-I (0-6 months)-Preview',
  component:FirstCatogPreviewComponent,
  canActivate:[AuthGuard]
},
{
  path:'Category II (6-59 months)',
  component:SecondCatogComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-II (6-59 months)',
  component:RefSecondCategoryComponent,
  canActivate:[AuthGuard],
},
{
  path:'Category-II (6-59 months)-Preview',
  component:SecondCatogPreviewComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category III (5-18 years)',
  component:ThirdCatogComponent,
  canActivate:[AuthGuard],

},
{
  path:'Category-III (5-18 years)',
  component:RefThirdCategoryComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-III (5-18 years)-Preview',
  component:ThirdCatogPreviewComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category IV (18-40 years)',
  component:FourthCatogComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-IV (18-40 years)',
  component:RefFourthCategoryComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-IV (18-40 years)-Preview',
  component:FourthCatogPreviewComponent,
  canActivate:[AuthGuard],
 
},
{
  path:'Category V (40-60 years)',
  component:FifthCatogComponent,
  canActivate:[AuthGuard],
  
},
{
  path:'Category-V (40-60 years)',
  component:RefFifthCategoryComponent,
  canActivate:[AuthGuard],
 
},
{
  path:'Category-V (40-60 years)-Preview',
  component:FifthCatogPreviewComponent,
  canActivate:[AuthGuard],

},
{
  path:'Category VI (Over 60 years)',
  component:SixthCatogComponent,
  canActivate:[AuthGuard]
},
{
  path:'Category-VI (Over 60 years)',
  component:RefSixthCategoryComponent,
  canActivate:[AuthGuard]
},
{
  path:'Category-VI (Over 60 years)-Preview',
  component:SixthCatogPreviewComponent,
  canActivate:[AuthGuard]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
