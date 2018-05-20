/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ResumeInfoUserComponent } from './ResumeInfoUser/ResumeInfoUser.component';
import { CertificateComponent } from './Certificate/Certificate.component';
import { AwardDetailsComponent } from './AwardDetails/AwardDetails.component';
import { UserInfoInEntComponent } from './UserInfoInEnt/UserInfoInEnt.component';
import { UserInfoInSchComponent } from './UserInfoInSch/UserInfoInSch.component';

import { RequestResumeComponent } from './RequestResume/RequestResume.component';

  import { UserComponent } from './User/User.component';
  import { OrganizationComponent } from './Organization/Organization.component';
  import { EnterpriseComponent } from './Enterprise/Enterprise.component';
  import { SchoolComponent } from './School/School.component';


 
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
	
    
		{ path: 'ResumeInfoUser', component: ResumeInfoUserComponent},
    
		{ path: 'Certificate', component: CertificateComponent},
    
		{ path: 'AwardDetails', component: AwardDetailsComponent},
    
		{ path: 'UserInfoInEnt', component: UserInfoInEntComponent},
    
		{ path: 'UserInfoInSch', component: UserInfoInSchComponent},
    
    { path: 'RequestResume', component: RequestResumeComponent},
    
      { path: 'User', component: UserComponent},
      
      { path: 'Organization', component: OrganizationComponent},
      
      { path: 'Enterprise', component: EnterpriseComponent},
      
      { path: 'School', component: SchoolComponent},
      
      
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
