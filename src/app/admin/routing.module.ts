import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuardService } from '../shared/auth/auth-guard.service';
import { OverviewComponent } from './overview/overview.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { ListExamComponent } from './list-exam/list-exam.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { PageNotFoundComponentComponent } from '../home/page-not-found-component.component';
import { ChangeInstNameComponent } from './change-inst-name/change-inst-name.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { CheckQuestionsComponent } from './check-questions/check-questions.component';
import { SolutionComponent } from './solution/solution.component';
import { RoleGuard } from '../shared/role.guard';
import { AdminResolverService } from './admin-resolver.service';


const routes: Routes = [
  // { path:'login',component:HomeComponent},
  // { path:'course',component:CourseSelectComponent, canActivate:[AuthGuardService]},
  { path:'admin',component:AdminComponent, 
  
  children:[
    {path:'overview',component:OverviewComponent ,canActivate:[AuthGuardService]},
    {path:'create-exam',component:CreateExamComponent ,canActivate:[AuthGuardService]},
    {path:'list-exam',component:ListExamComponent ,canActivate:[AuthGuardService]},
    {path:'submissions',component:SubmissionsComponent ,canActivate:[AuthGuardService]},
    {path:'change-inst-name',component:ChangeInstNameComponent ,canActivate:[AuthGuardService]},
    {path:'add-question/:id',component:AddQuestionComponent ,canActivate:[AuthGuardService]},
    {path:'edit-question/:qid',component:AddQuestionComponent ,canActivate:[AuthGuardService]},
    {path:'view-question/:id',component:ViewQuestionComponent ,canActivate:[AuthGuardService]},
    {path:'check-questions/:sid/:eid',component:CheckQuestionsComponent ,canActivate:[AuthGuardService]},
    {path:'solution/:sid/:qid',component:SolutionComponent ,canActivate:[AuthGuardService]},

    { path :'',redirectTo : 'overview',pathMatch :'full' },
    { path:"**",component:PageNotFoundComponentComponent}

  ],
    
  canActivate:[AuthGuardService,RoleGuard],
  resolve:{data:AdminResolverService}

},

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [

    RouterModule
  ]
})


export class RoutingModule { }
