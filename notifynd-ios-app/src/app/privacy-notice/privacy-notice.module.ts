import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyNoticePageRoutingModule } from './privacy-notice-routing.module';

import { PrivacyNoticePage } from './privacy-notice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyNoticePageRoutingModule
  ],
  declarations: [PrivacyNoticePage]
})
export class PrivacyNoticePageModule {}
