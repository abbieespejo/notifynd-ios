import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyNoticePage } from './privacy-notice.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyNoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyNoticePageRoutingModule {}
