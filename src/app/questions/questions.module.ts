import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { QuestionsComponent } from './questions.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponentComponent } from '../home/page-not-found-component.component';
import { AuthGuardService } from '../shared/auth/auth-guard.service';
import { EditorComponent } from './editor/editor.component';
import { QuestionComponent } from './question/question.component';
import { RoleGuard } from '../shared/role.guard';
import { StudentGuard } from '../shared/student.guard';
import { TimeoutDialogComponent } from './timeout-dialog.component';


const routes: Routes = [
  { path:'questions',component:QuestionsComponent, 
  
  children:[
    {path:'question',component:QuestionComponent ,canActivate:[AuthGuardService]},
    {path:'editor',component:EditorComponent ,canActivate:[AuthGuardService]},
    { path :'',redirectTo : 'question',pathMatch :'full' },
    { path:"**",component:PageNotFoundComponentComponent}

  ],
    
  canActivate:[AuthGuardService,StudentGuard]},
 
];


@NgModule({
  declarations: [QuestionsComponent, EditorComponent, QuestionComponent, TimeoutDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports :[
    RouterModule

  ],
  


})
export class QuestionsModule { }
