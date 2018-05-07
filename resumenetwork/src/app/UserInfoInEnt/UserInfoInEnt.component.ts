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
import { UserInfoInEntService } from './UserInfoInEnt.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-UserInfoInEnt',
	templateUrl: './UserInfoInEnt.component.html',
	styleUrls: ['./UserInfoInEnt.component.css'],
  providers: [UserInfoInEntService]
})
export class UserInfoInEntComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  private myUserInfoInEnt;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          enterpriseId = new FormControl("", Validators.required);
        
  
      
          enterpriseName = new FormControl("", Validators.required);
        
  
      
          userPosition = new FormControl("", Validators.required);
        
  
      
          performingTask = new FormControl("", Validators.required);
        
  
      
          dateOfEmployment = new FormControl("", Validators.required);
        
  
      
          retirementDate = new FormControl("");
        
  
      
          transactionTime = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);


          userId = new FormControl("",Validators.required);  

    
          transactionId = new FormControl("",Validators.required);  
        
    
          timestamp = new FormControl("",Validators.required);  
        
  


  constructor(private serviceUserInfoInEnt:UserInfoInEntService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          enterpriseId:this.enterpriseId,
        
    
        
          enterpriseName:this.enterpriseName,
        
    
        
          userPosition:this.userPosition,
        
    
        
          performingTask:this.performingTask,
        
    
        
          dateOfEmployment:this.dateOfEmployment,
        
    
        
          retirementDate:this.retirementDate,
        
    
        
          transactionTime:this.transactionTime,
        
    
        
          isPublic:this.isPublic
        
    
    });

      this.myForm2 = fb.group({
    
        
         enterpriseId:this.enterpriseId,
    

    
          enterpriseName:this.enterpriseName,
    

    
         userPosition:this.userPosition,
    

    
         performingTask:this.performingTask,
    

    
        dateOfEmployment:this.dateOfEmployment,
    

    
        retirementDate:this.retirementDate,
    

    
        isPublic:this.isPublic,
    

    
        userId:this.userId,
    

      /*
        transactionId:this.transactionId,
    

    
        timestamp:this.timestamp
     */

    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceUserInfoInEnt.getSystemPing()
    .toPromise()
    .then((result) => {
     var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];
        this.serviceUserInfoInEnt.getSystemQueryUserInfoInEnt("CurrentUserId", this.currentId)
        .toPromise()
        .then((UserInfoInEnt) => {
          this.myUserInfoInEnt = UserInfoInEnt;
        })
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.UserInfoInEnt",
      
        
          "assetId":this.assetId.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "enterpriseId":this.enterpriseId.value,
        
      
        
          "enterpriseName":this.enterpriseName.value,
        
      
        
          "userPosition":this.userPosition.value,
        
      
        
          "performingTask":this.performingTask.value,
        
      
        
          "dateOfEmployment":this.dateOfEmployment.value,
        
      
        
          "retirementDate":this.retirementDate.value,
        
      
        
          "transactionTime":this.transactionTime.value,
        
      
        
          "isPublic":this.isPublic.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "enterpriseId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "isPublic":null
        
      
    });

    return this.serviceUserInfoInEnt.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "enterpriseId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "isPublic":null 
        
      
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




  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateUserInfoInEnt",
      
        
          "enterpriseId":this.enterpriseId.value,
        
      
        
          "enterpriseName":this.enterpriseName.value,
        
      
        
          "userPosition":this.userPosition.value,
        
      
        
          "performingTask":this.performingTask.value,
        
      
        
          "dateOfEmployment":this.dateOfEmployment.value,
        

          "retirementDate":this.retirementDate.value,
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        /*
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
          */
        
      
    };

    this.myForm2.setValue({
      
        
          "enterpriseId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        /*
          "transactionId":null,
        
      
        
          "timestamp":null
        */
      
    });

    return this.serviceUserInfoInEnt.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm2.setValue({
      
        
          "enterpriseId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        /*
          "transactionId":null,
        
      
        
          "timestamp":null 
        */
      
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

   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.UserInfoInEnt",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "enterpriseId":this.enterpriseId.value,
          
        
    
        
          
            "enterpriseName":this.enterpriseName.value,
          
        
    
        
          
            "userPosition":this.userPosition.value,
          
        
    
        
          
            "performingTask":this.performingTask.value,
          
        
    
        
          
            "dateOfEmployment":this.dateOfEmployment.value,
          
        
    
        
          
            "retirementDate":this.retirementDate.value,
          
        
    
        
          
            "transactionTime":this.transactionTime.value,
          
        
    
        
          
            "isPublic":this.isPublic.value
          
        
    
    };

    return this.serviceUserInfoInEnt.updateAsset(form.get("assetId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceUserInfoInEnt.deleteAsset(this.currentId)
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

    return this.serviceUserInfoInEnt.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "enterpriseId":null,
          
        
          
            "enterpriseName":null,
          
        
          
            "userPosition":null,
          
        
          
            "performingTask":null,
          
        
          
            "dateOfEmployment":null,
          
        
          
            "retirementDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "isPublic":null 
          
        
      };



      
        if(result.assetId){
          
            formObject.assetId = result.assetId;
          
        }else{
          formObject.assetId = null;
        }
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
        }
      
        if(result.enterpriseId){
          
            formObject.enterpriseId = result.enterpriseId;
          
        }else{
          formObject.enterpriseId = null;
        }
      
        if(result.enterpriseName){
          
            formObject.enterpriseName = result.enterpriseName;
          
        }else{
          formObject.enterpriseName = null;
        }
      
        if(result.userPosition){
          
            formObject.userPosition = result.userPosition;
          
        }else{
          formObject.userPosition = null;
        }
      
        if(result.performingTask){
          
            formObject.performingTask = result.performingTask;
          
        }else{
          formObject.performingTask = null;
        }
      
        if(result.dateOfEmployment){
          
            formObject.dateOfEmployment = result.dateOfEmployment;
          
        }else{
          formObject.dateOfEmployment = null;
        }
      
        if(result.retirementDate){
          
            formObject.retirementDate = result.retirementDate;
          
        }else{
          formObject.retirementDate = null;
        }
      
        if(result.transactionTime){
          
            formObject.transactionTime = result.transactionTime;
          
        }else{
          formObject.transactionTime = null;
        }
      
        if(result.isPublic){
          
            formObject.isPublic = result.isPublic;
          
        }else{
          formObject.isPublic = null;
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
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "enterpriseId":null,
        
      
        
          "enterpriseName":null,
        
      
        
          "userPosition":null,
        
      
        
          "performingTask":null,
        
      
        
          "dateOfEmployment":null,
        
      
        
          "retirementDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "isPublic":null 
        
      
      });
  }

}
