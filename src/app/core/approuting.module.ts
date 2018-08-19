import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { QuizPageComponent } from '../quiz-page/quiz-page.component';
import { HomePageComponent } from '../home-page/home-page.component';

const ROUTES : ModuleWithProviders = RouterModule.forRoot([

    { path: 'home', component: HomePageComponent},
    { path: 'quiz',component:QuizPageComponent},
    { path:'',redirectTo:'home',pathMatch:'full'}
],{ useHash: true })
@NgModule({
    imports:[ROUTES],
    exports:[RouterModule],

})
export class AppRoutingModule{}