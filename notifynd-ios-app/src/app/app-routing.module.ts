import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'begin',
    loadChildren: () => import('./begin/begin.module').then( m => m.BeginPageModule)
  },
  {
    path: 'privacy-notice',
    loadChildren: () => import('./privacy-notice/privacy-notice.module').then( m => m.PrivacyNoticePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
