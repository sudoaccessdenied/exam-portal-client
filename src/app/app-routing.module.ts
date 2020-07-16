import { NgModule, Query } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './home/page-not-found-component.component';
import { CourseSelectComponent } from './course/course-select.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { StudentGuard } from './shared/student.guard';
import { CourseResolverService } from './course/course-resolver.service';


const routes: Routes = [
  { path:'login',component:HomeComponent},
  { path:'course',component:CourseSelectComponent, canActivate:[AuthGuardService,StudentGuard],resolve:{

    data:CourseResolverService
  }},
  { path :'',redirectTo : 'login',pathMatch :'full' },
  { path:"**",component:PageNotFoundComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
