import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './quiz-confirmation.component.html',
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data) {
        console.log('data is Data',data);
      }
  
    onNoClick(): void {
    let conform="no";
      this.dialogRef.close({
      response :"no" 
        
      });
    }
  proceed(){
    let conform="yes";
    this.dialogRef.close({
      response :"yes" 
    });
  }
  }