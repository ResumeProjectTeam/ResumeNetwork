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
import { CreateUserInfoInSchService } from './CreateUserInfoInSch.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-CreateUserInfoInSch',
	templateUrl: './CreateUserInfoInSch.component.html',
	styleUrls: ['./CreateUserInfoInSch.component.css'],
  providers: [CreateUserInfoInSchService]
})
export class CreateUserInfoInSchComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          authorizedParticipantId = new FormControl("", Validators.required);
        
  
      
          schoolName = new FormControl("", Validators.required);
        
  
      
          entranceDate = new FormControl("", Validators.required);
        
  
      
          graduationDate = new FormControl("", Validators.required);
        
  
      
          majorField = new FormControl("", Validators.required);
        
  
      
          gradeAverage = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  
      
          authorizedParticipantType = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceCreateUserInfoInSch:CreateUserInfoInSchService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          authorizedParticipantId:this.authorizedParticipantId,
        
    
        
          schoolName:this.schoolName,
        
    
        
          entranceDate:this.entranceDate,
        
    
        
          graduationDate:this.graduationDate,
        
    
        
          majorField:this.majorField,
        
    
        
          gradeAverage:this.gradeAverage,
        
    
        
          isPublic:this.isPublic,
        
    
        
          userId:this.userId,
        
    
        
          authorizedParticipantType:this.authorizedParticipantType,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCreateUserInfoInSch.getAll()
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
      $class: "hansung.ac.kr.transaction.CreateUserInfoInSch",
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "schoolName":this.schoolName.value,
        
      
        
          "entranceDate":this.entranceDate.value,
        
      
        
          "graduationDate":this.graduationDate.value,
        
      
        
          "majorField":this.majorField.value,
        
      
        
          "gradeAverage":this.gradeAverage.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        
          "authorizedParticipantType":this.authorizedParticipantType.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "authorizedParticipantType":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceCreateUserInfoInSch.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "authorizedParticipantType":null,
        
      
        
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
      $class: "hansung.ac.kr.transaction.CreateUserInfoInSch",
      
        
          
            "authorizedParticipantId":this.authorizedParticipantId.value,
          
        
    
        
          
            "schoolName":this.schoolName.value,
          
        
    
        
          
            "entranceDate":this.entranceDate.value,
          
        
    
        
          
            "graduationDate":this.graduationDate.value,
          
        
    
        
          
            "majorField":this.majorField.value,
          
        
    
        
          
            "gradeAverage":this.gradeAverage.value,
          
        
    
        
          
            "isPublic":this.isPublic.value,
          
        
    
        
          
            "userId":this.userId.value,
          
        
    
        
          
            "authorizedParticipantType":this.authorizedParticipantType.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceCreateUserInfoInSch.updateTransaction(form.get("transactionId").value,this.Transaction)
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

    return this.serviceCreateUserInfoInSch.deleteTransaction(this.currentId)
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

    return this.serviceCreateUserInfoInSch.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "authorizedParticipantId":null,
          
        
          
            "schoolName":null,
          
        
          
            "entranceDate":null,
          
        
          
            "graduationDate":null,
          
        
          
            "majorField":null,
          
        
          
            "gradeAverage":null,
          
        
          
            "isPublic":null,
          
        
          
            "userId":null,
          
        
          
            "authorizedParticipantType":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.authorizedParticipantId){
          
            formObject.authorizedParticipantId = result.authorizedParticipantId;
          
        }else{
          formObject.authorizedParticipantId = null;
        }
      
        if(result.schoolName){
          
            formObject.schoolName = result.schoolName;
          
        }else{
          formObject.schoolName = null;
        }
      
        if(result.entranceDate){
          
            formObject.entranceDate = result.entranceDate;
          
        }else{
          formObject.entranceDate = null;
        }
      
        if(result.graduationDate){
          
            formObject.graduationDate = result.graduationDate;
          
        }else{
          formObject.graduationDate = null;
        }
      
        if(result.majorField){
          
            formObject.majorField = result.majorField;
          
        }else{
          formObject.majorField = null;
        }
      
        if(result.gradeAverage){
          
            formObject.gradeAverage = result.gradeAverage;
          
        }else{
          formObject.gradeAverage = null;
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
      
        if(result.authorizedParticipantType){
          
            formObject.authorizedParticipantType = result.authorizedParticipantType;
          
        }else{
          formObject.authorizedParticipantType = null;
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
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "authorizedParticipantType":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

