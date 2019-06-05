import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmClientesPage } from './adm-clientes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    //AdmClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmClientesPage),
    TranslateModule
  ],
})
export class AdmClientesPageModule {}
