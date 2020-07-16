import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration.component';
import { AdminregComponent } from './adminreg.component';



@NgModule({
  declarations: [RegistrationComponent, AdminregComponent],
  imports: [
    SharedModule
  ],
  exports:[RegistrationComponent ,AdminregComponent]
})
export class RegistrationModule { }
