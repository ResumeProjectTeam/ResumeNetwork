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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OrganizationService } from './Organization.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Organization',
	templateUrl: './Organization.component.html',
	styleUrls: ['./Organization.component.css'],
  providers: [OrganizationService]
})
export class OrganizationComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          orgId = new FormControl("", Validators.required);
        
  
      
          orgName = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          contactAdress = new FormControl("", Validators.required);
        
  
      
          homepage = new FormControl("", Validators.required);
        
  
      
          discription = new FormControl("", Validators.required);
        
  
      
          requestUser = new FormControl("", Validators.required);
        
  


  constructor(private serviceOrganization:OrganizationService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          orgId:this.orgId,
        
    
        
          orgName:this.orgName,
        
    
        
          address:this.address,
        
    
        
          contactAdress:this.contactAdress,
        
    
        
          homepage:this.homepage,
        
    
        
          discription:this.discription,
        
    
        
          requestUser:this.requestUser
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceOrganization.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "hansung.ac.kr.participants.Organization",
      
        
          "orgId":this.orgId.value,
        
      
        
          "orgName":this.orgName.value,
        
      
        
          "address":this.address.value,
        
      
        
          "contactAdress":this.contactAdress.value,
        
      
        
          "homepage":this.homepage.value,
        
      
        
          "discription":this.discription.value,
        
      
        
          "requestUser":this.requestUser.value
        
      
    };

    this.myForm.setValue({
      
        
          "orgId":null,
        
      
        
          "orgName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "homepage":null,
        
      
        
          "discription":null,
        
      
        
          "requestUser":null
        
      
    });

    return this.serviceOrganization.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "orgId":null,
        
      
        
          "orgName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "homepage":null,
        
      
        
          "discription":null,
        
      
        
          "requestUser":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "hansung.ac.kr.participants.Organization",
      
        
          
        
    
        
          
            "orgName":this.orgName.value,
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "contactAdress":this.contactAdress.value,
          
        
    
        
          
            "homepage":this.homepage.value,
          
        
    
        
          
            "discription":this.discription.value,
          
        
    
        
          
            "requestUser":this.requestUser.value
          
        
    
    };

    return this.serviceOrganization.updateParticipant(form.get("orgId").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceOrganization.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceOrganization.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "orgId":null,
          
        
          
            "orgName":null,
          
        
          
            "address":null,
          
        
          
            "contactAdress":null,
          
        
          
            "homepage":null,
          
        
          
            "discription":null,
          
        
          
            "requestUser":null 
          
        
      };



      
        if(result.orgId){
          
            formObject.orgId = result.orgId;
          
        }else{
          formObject.orgId = null;
        }
      
        if(result.orgName){
          
            formObject.orgName = result.orgName;
          
        }else{
          formObject.orgName = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.contactAdress){
          
            formObject.contactAdress = result.contactAdress;
          
        }else{
          formObject.contactAdress = null;
        }
      
        if(result.homepage){
          
            formObject.homepage = result.homepage;
          
        }else{
          formObject.homepage = null;
        }
      
        if(result.discription){
          
            formObject.discription = result.discription;
          
        }else{
          formObject.discription = null;
        }
      
        if(result.requestUser){
          
            formObject.requestUser = result.requestUser;
          
        }else{
          formObject.requestUser = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "orgId":null,
        
      
        
          "orgName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "homepage":null,
        
      
        
          "discription":null,
        
      
        
          "requestUser":null 
        
      
      });
  }

}
