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

import { AuthenticationComponent } from './Authentication/Authentication.component';
import { ResumeInfoUserComponent } from './ResumeInfoUser/ResumeInfoUser.component';
import { CertificateComponent } from './Certificate/Certificate.component';
import { AwardDetailsComponent } from './AwardDetails/AwardDetails.component';
import { UserInfoInEntComponent } from './UserInfoInEnt/UserInfoInEnt.component';
import { UserInfoInSchComponent } from './UserInfoInSch/UserInfoInSch.component';


  import { UserComponent } from './User/User.component';
  import { OrganizationComponent } from './Organization/Organization.component';
  import { EnterpriseComponent } from './Enterprise/Enterprise.component';
  import { SchoolComponent } from './School/School.component';


  import { AddRequestUserComponent } from './AddRequestUser/AddRequestUser.component';
  import { RevokeRequestUserComponent } from './RevokeRequestUser/RevokeRequestUser.component';
  import { CreateAuthenticationComponent } from './CreateAuthentication/CreateAuthentication.component';
  import { CreateResumeInfoUserComponent } from './CreateResumeInfoUser/CreateResumeInfoUser.component';
  import { CreateCertificateComponent } from './CreateCertificate/CreateCertificate.component';
  import { CreateAwardDetailsComponent } from './CreateAwardDetails/CreateAwardDetails.component';
  import { CreateUserInfoInEntComponent } from './CreateUserInfoInEnt/CreateUserInfoInEnt.component';
  import { CreateUserInfoInSchComponent } from './CreateUserInfoInSch/CreateUserInfoInSch.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Authentication', component: AuthenticationComponent},
    
		{ path: 'ResumeInfoUser', component: ResumeInfoUserComponent},
    
		{ path: 'Certificate', component: CertificateComponent},
    
		{ path: 'AwardDetails', component: AwardDetailsComponent},
    
		{ path: 'UserInfoInEnt', component: UserInfoInEntComponent},
    
		{ path: 'UserInfoInSch', component: UserInfoInSchComponent},
    
    
      { path: 'User', component: UserComponent},
      
      { path: 'Organization', component: OrganizationComponent},
      
      { path: 'Enterprise', component: EnterpriseComponent},
      
      { path: 'School', component: SchoolComponent},
      
      
        { path: 'AddRequestUser', component: AddRequestUserComponent},
        
        { path: 'RevokeRequestUser', component: RevokeRequestUserComponent},
        
        { path: 'CreateAuthentication', component: CreateAuthenticationComponent},
        
        { path: 'CreateResumeInfoUser', component: CreateResumeInfoUserComponent},
        
        { path: 'CreateCertificate', component: CreateCertificateComponent},
        
        { path: 'CreateAwardDetails', component: CreateAwardDetailsComponent},
        
        { path: 'CreateUserInfoInEnt', component: CreateUserInfoInEntComponent},
        
        { path: 'CreateUserInfoInSch', component: CreateUserInfoInSchComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
