import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule }   from '@angular/forms';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { AppRoutingModule } from './core/approuting.module';
import { HttpModule } from '@angular/http';
import { HomePageService } from './home-page/home-page.service';
import { DialogOverviewExampleDialog } from './quiz-page/quiz-confirmation.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    QuizPageComponent,
    DialogOverviewExampleDialog
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,  
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    FormsModule,
    AppRoutingModule,
    HttpModule ,
    MatProgressSpinnerModule  ,
    MatDialogModule
  ],
  entryComponents:[DialogOverviewExampleDialog],
  providers: [HomePageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
