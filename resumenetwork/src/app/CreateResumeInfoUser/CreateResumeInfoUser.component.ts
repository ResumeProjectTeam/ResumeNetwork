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
import { CreateResumeInfoUserService } from './CreateResumeInfoUser.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-CreateResumeInfoUser',
	templateUrl: './CreateResumeInfoUser.component.html',
	styleUrls: ['./CreateResumeInfoUser.component.css'],
  providers: [CreateResumeInfoUserService]
})
export class CreateResumeInfoUserComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
          name = new FormControl("", Validators.required);


      
          dob = new FormControl("", Validators.required);
        
  
      
          supportField = new FormControl("", Validators.required);
        
  
      
          salaryRequirement = new FormControl("", Validators.required);
        
  
      
          majorActivities = new FormControl("", Validators.required);
        
  
      
          socialExperience = new FormControl("", Validators.required);
        
  
      
          skillsAndCapabilities = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceCreateResumeInfoUser:CreateResumeInfoUserService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          name:this.name,



          dob:this.dob,
        
    
        
          supportField:this.supportField,
        
    
        
          salaryRequirement:this.salaryRequirement,
        
    
        
          majorActivities:this.majorActivities,
        
    
        
          socialExperience:this.socialExperience,
        
    
        
          skillsAndCapabilities:this.skillsAndCapabilities,
        
    
        
          isPublic:this.isPublic,
        
    
        
          userId:this.userId,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCreateResumeInfoUser.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateResumeInfoUser",
      

          "name":this.name.value,
          

        
          "dob":this.dob.value,
        
      
        
          "supportField":this.supportField.value,
        
      
        
          "salaryRequirement":this.salaryRequirement.value,
        
      
        
          "majorActivities":this.majorActivities.value,
        
      
        
          "socialExperience":this.socialExperience.value,
        
      
        
          "skillsAndCapabilities":this.skillsAndCapabilities.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        

          "name":null,



          "dob":null,
        
      
        
          "supportField":null,
        
      
        
          "salaryRequirement":null,
        
      
        
          "majorActivities":null,
        
      
        
          "socialExperience":null,
        
      
        
          "skillsAndCapabilities":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceCreateResumeInfoUser.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "name":null,


          "dob":null,
        
      
        
          "supportField":null,
        
      
        
          "salaryRequirement":null,
        
      
        
          "majorActivities":null,
        
      
        
          "socialExperience":null,
        
      
        
          "skillsAndCapabilities":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
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


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateResumeInfoUser",
      
        
            "name":this.name.value,



          
            "dob":this.dob.value,
          
        
    
        
          
            "supportField":this.supportField.value,
          
        
    
        
          
            "salaryRequirement":this.salaryRequirement.value,
          
        
    
        
          
            "majorActivities":this.majorActivities.value,
          
        
    
        
          
            "socialExperience":this.socialExperience.value,
          
        
    
        
          
            "skillsAndCapabilities":this.skillsAndCapabilities.value,
          
        
    
        
          
            "isPublic":this.isPublic.value,
          
        
    
        
          
            "userId":this.userId.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceCreateResumeInfoUser.updateTransaction(form.get("transactionId").value,this.Transaction)
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


  deleteTransaction(): Promise<any> {

    return this.serviceCreateResumeInfoUser.deleteTransaction(this.currentId)
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

    return this.serviceCreateResumeInfoUser.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        

            "name":null,


          
            "dob":null,
          
        
          
            "supportField":null,
          
        
          
            "salaryRequirement":null,
          
        
          
            "majorActivities":null,
          
        
          
            "socialExperience":null,
          
        
          
            "skillsAndCapabilities":null,
          
        
          
            "isPublic":null,
          
        
          
            "userId":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };




      if(result.name){
          
         formObject.name = result.name;
      
      }else{
          formObject.name = null;
       }


      
        if(result.dob){
          
            formObject.dob = result.dob;
          
        }else{
          formObject.dob = null;
        }
      
        if(result.supportField){
          
            formObject.supportField = result.supportField;
          
        }else{
          formObject.supportField = null;
        }
      
        if(result.salaryRequirement){
          
            formObject.salaryRequirement = result.salaryRequirement;
          
        }else{
          formObject.salaryRequirement = null;
        }
      
        if(result.majorActivities){
          
            formObject.majorActivities = result.majorActivities;
          
        }else{
          formObject.majorActivities = null;
        }
      
        if(result.socialExperience){
          
            formObject.socialExperience = result.socialExperience;
          
        }else{
          formObject.socialExperience = null;
        }
      
        if(result.skillsAndCapabilities){
          
            formObject.skillsAndCapabilities = result.skillsAndCapabilities;
          
        }else{
          formObject.skillsAndCapabilities = null;
        }
      
        if(result.isPublic){
          
            formObject.isPublic = result.isPublic;
          
        }else{
          formObject.isPublic = null;
        }
      
        if(result.userId){
          
            formObject.userId = result.userId;
          
        }else{
          formObject.userId = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
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
      

          "name":null,

        
          "dob":null,
        
      
        
          "supportField":null,
        
      
        
          "salaryRequirement":null,
        
      
        
          "majorActivities":null,
        
      
        
          "socialExperience":null,
        
      
        
          "skillsAndCapabilities":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

