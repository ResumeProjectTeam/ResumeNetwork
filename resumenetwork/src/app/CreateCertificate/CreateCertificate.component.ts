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
import { CreateCertificateService } from './CreateCertificate.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-CreateCertificate',
	templateUrl: './CreateCertificate.component.html',
	styleUrls: ['./CreateCertificate.component.css'],
  providers: [CreateCertificateService]
})
export class CreateCertificateComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          certificateName = new FormControl("", Validators.required);
        
  
      
          certificateScore = new FormControl("", Validators.required);
        
  
      
          organizationId = new FormControl("", Validators.required);
        
  
      
          organizationName = new FormControl("", Validators.required);
        
  
      
          dob = new FormControl("", Validators.required);
        
  
      
          expirationDate = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceCreateCertificate:CreateCertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          certificateName:this.certificateName,
        
    
        
          certificateScore:this.certificateScore,
        
    
        
          organizationId:this.organizationId,
        
    
        
          organizationName:this.organizationName,
        
    
        
          dob:this.dob,
        
    
        
          expirationDate:this.expirationDate,
        
    
        
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
    return this.serviceCreateCertificate.getAll()
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
      $class: "hansung.ac.kr.transaction.CreateCertificate",
      
        
          "certificateName":this.certificateName.value,
        
      
        
          "certificateScore":this.certificateScore.value,
        
      
        
          "organizationId":this.organizationId.value,
        
      
        
          "organizationName":this.organizationName.value,
        
      
        
          "dob":this.dob.value,
        
      
        
          "expirationDate":this.expirationDate.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "certificateName":null,
        
      
        
          "certificateScore":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dob":null,
        
      
        
          "expirationDate":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceCreateCertificate.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "certificateName":null,
        
      
        
          "certificateScore":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dob":null,
        
      
        
          "expirationDate":null,
        
      
        
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
      $class: "hansung.ac.kr.transaction.CreateCertificate",
      
        
          
            "certificateName":this.certificateName.value,
          
        
    
        
          
            "certificateScore":this.certificateScore.value,
          
        
    
        
          
            "organizationId":this.organizationId.value,
          
        
    
        
          
            "organizationName":this.organizationName.value,
          
        
    
        
          
            "dob":this.dob.value,
          
        
    
        
          
            "expirationDate":this.expirationDate.value,
          
        
    
        
          
            "isPublic":this.isPublic.value,
          
        
    
        
          
            "userId":this.userId.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceCreateCertificate.updateTransaction(form.get("transactionId").value,this.Transaction)
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

    return this.serviceCreateCertificate.deleteTransaction(this.currentId)
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

    return this.serviceCreateCertificate.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "certificateName":null,
          
        
          
            "certificateScore":null,
          
        
          
            "organizationId":null,
          
        
          
            "organizationName":null,
          
        
          
            "dob":null,
          
        
          
            "expirationDate":null,
          
        
          
            "isPublic":null,
          
        
          
            "userId":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.certificateName){
          
            formObject.certificateName = result.certificateName;
          
        }else{
          formObject.certificateName = null;
        }
      
        if(result.certificateScore){
          
            formObject.certificateScore = result.certificateScore;
          
        }else{
          formObject.certificateScore = null;
        }
      
        if(result.organizationId){
          
            formObject.organizationId = result.organizationId;
          
        }else{
          formObject.organizationId = null;
        }
      
        if(result.organizationName){
          
            formObject.organizationName = result.organizationName;
          
        }else{
          formObject.organizationName = null;
        }
      
        if(result.dob){
          
            formObject.dob = result.dob;
          
        }else{
          formObject.dob = null;
        }
      
        if(result.expirationDate){
          
            formObject.expirationDate = result.expirationDate;
          
        }else{
          formObject.expirationDate = null;
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
      
        
          "certificateName":null,
        
      
        
          "certificateScore":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dob":null,
        
      
        
          "expirationDate":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

