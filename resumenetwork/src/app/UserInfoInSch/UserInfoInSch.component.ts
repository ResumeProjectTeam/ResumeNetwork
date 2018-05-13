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
import { UserInfoInSchService } from './UserInfoInSch.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-UserInfoInSch',
	templateUrl: './UserInfoInSch.component.html',
	styleUrls: ['./UserInfoInSch.component.css'],
  providers: [UserInfoInSchService]
})
export class UserInfoInSchComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  private myUserInfoInSch;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          authorizedParticipantId = new FormControl("", Validators.required);
        
  
      
          schoolName = new FormControl("", Validators.required);
        
  
      
          entranceDate = new FormControl("", Validators.required);
        
  
      
          graduationDate = new FormControl("", Validators.required);
        
  
      
          transactionTime = new FormControl("", Validators.required);
        
  
      
          majorField = new FormControl("", Validators.required);
        
  
      
          gradeAverage = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);



          userId = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceUserInfoInSch:UserInfoInSchService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          authorizedParticipantId:this.authorizedParticipantId,
        
    
        
          schoolName:this.schoolName,
        
    
        
          entranceDate:this.entranceDate,
        
    
        
          graduationDate:this.graduationDate,
        
    
        
          transactionTime:this.transactionTime,
        
    
        
          majorField:this.majorField,
        
    
        
          gradeAverage:this.gradeAverage,
        
    
        
          isPublic:this.isPublic
        
    
    });


    this.myForm2 = fb.group({
    
        
      authorizedParticipantId:this.authorizedParticipantId,
    

    
      schoolName:this.schoolName,
    

    
      entranceDate:this.entranceDate,
    

    
      graduationDate:this.graduationDate,
    

    
      majorField:this.majorField,
    

    
      gradeAverage:this.gradeAverage,
    

    
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
    return this.serviceUserInfoInSch.getSystemPing()
    .toPromise()
    .then((result) => {
     var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];
        this.serviceUserInfoInSch.getSystemQueryUserInfoInSch("CurrentUserId", this.currentId)
        .toPromise()
        .then((UserInfoInSch) => {
          this.myUserInfoInSch = UserInfoInSch;
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
      $class: "hansung.ac.kr.assets.UserInfoInSch",
      
        
          "assetId":this.assetId.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "schoolName":this.schoolName.value,
        
      
        
          "entranceDate":this.entranceDate.value,
        
      
        
          "graduationDate":this.graduationDate.value,
        
      
        
          "transactionTime":this.transactionTime.value,
        
      
        
          "majorField":this.majorField.value,
        
      
        
          "gradeAverage":this.gradeAverage.value,
        
      
        
          "isPublic":this.isPublic.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null
        
      
    });

    return this.serviceUserInfoInSch.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
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
      $class: "hansung.ac.kr.transaction.CreateUserInfoInSch",
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "schoolName":this.schoolName.value,
        
      
        
          "entranceDate":this.entranceDate.value,
        
      
        
          "graduationDate":this.graduationDate.value,
        
      
        
          "majorField":this.majorField.value,
        
      
        
          "gradeAverage":this.gradeAverage.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        /*
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        */
      
    };

    this.myForm2.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        /*
          "transactionId":null,
        
      
        
          "timestamp":null
        */
      
    });

    return this.serviceUserInfoInSch.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm2.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
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
      $class: "hansung.ac.kr.assets.UserInfoInSch",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "authorizedParticipantId":this.authorizedParticipantId.value,
          
        
    
        
          
            "schoolName":this.schoolName.value,
          
        
    
        
          
            "entranceDate":this.entranceDate.value,
          
        
    
        
          
            "graduationDate":this.graduationDate.value,
          
        
    
        
          
            "transactionTime":this.transactionTime.value,
          
        
    
        
          
            "majorField":this.majorField.value,
          
        
    
        
          
            "gradeAverage":this.gradeAverage.value,
          
        
    
        
          
            "isPublic":this.isPublic.value
          
        
    
    };

    return this.serviceUserInfoInSch.updateAsset(form.get("assetId").value,this.asset)
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

    return this.serviceUserInfoInSch.deleteAsset(this.currentId)
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

    return this.serviceUserInfoInSch.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "authorizedParticipantId":null,
          
        
          
            "schoolName":null,
          
        
          
            "entranceDate":null,
          
        
          
            "graduationDate":null,
          
        
          
            "transactionTime":null,
          
        
          
            "majorField":null,
          
        
          
            "gradeAverage":null,
          
        
          
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
      
        if(result.transactionTime){
          
            formObject.transactionTime = result.transactionTime;
          
        }else{
          formObject.transactionTime = null;
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
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "schoolName":null,
        
      
        
          "entranceDate":null,
        
      
        
          "graduationDate":null,
        
      
        
          "transactionTime":null,
        
      
        
          "majorField":null,
        
      
        
          "gradeAverage":null,
        
      
        
          "isPublic":null 
        
      
      });
  }

}
