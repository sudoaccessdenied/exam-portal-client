import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ListExamComponent } from './list-exam/list-exam.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { ChangeInstNameComponent } from './change-inst-name/change-inst-name.component';
import { RoutingModule } from './routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { CheckQuestionsComponent } from './check-questions/check-questions.component';
import { SolutionComponent } from './solution/solution.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [AdminComponent, OverviewComponent, CreateExamComponent, ListExamComponent, SubmissionsComponent, ChangeInstNameComponent, AddQuestionComponent, ViewQuestionComponent, CheckQuestionsComponent, SolutionComponent],
  imports: [
    SharedModule,
    RoutingModule ,
    AngularEditorModule 
   
  ],
  providers:[DatePipe],

  exports:[]
})
export class AdminModule { }
