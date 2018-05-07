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
import { AwardDetailsService } from './AwardDetails.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-AwardDetails',
	templateUrl: './AwardDetails.component.html',
	styleUrls: ['./AwardDetails.component.css'],
  providers: [AwardDetailsService]
})
export class AwardDetailsComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  private myAwardDetailsList;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          contestName = new FormControl("", Validators.required);
        
  
      
          organizationId = new FormControl("", Validators.required);
        
  
      
          organizationName = new FormControl("", Validators.required);
        
  
      
          dateOfAward = new FormControl("", Validators.required);
        
  
      
          transactionTime = new FormControl("", Validators.required);
        
  
      
          awardGrade = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          isPublic = new FormControl("", Validators.required);



          userId  = new FormControl("test",Validators.required);
        
      
        
          transactionId  = new FormControl("",Validators.required);
        
      
        
          timestamp  = new FormControl("",Validators.required);
        
  


  constructor(private serviceAwardDetails:AwardDetailsService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          contestName:this.contestName,
        
    
        
          organizationId:this.organizationId,
        
    
        
          organizationName:this.organizationName,
        
    
        
          dateOfAward:this.dateOfAward,
        
    
        
          transactionTime:this.transactionTime,
        
    
        
          awardGrade:this.awardGrade,
        
    
        
          description:this.description,
        
    
        
          isPublic:this.isPublic
        
    
    });



    this.myForm2 = fb.group({
    
      contestName:this.contestName,
        
    
        
      organizationId:this.organizationId,
    

    
      organizationName:this.organizationName,
    

    
      dateOfAward:this.dateOfAward,
    

    
      awardGrade:this.awardGrade,
    

    
      description:this.description,
    

    
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
    return this.serviceAwardDetails.getSystemPing()
    .toPromise()
    .then((result) => {
     var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];
        this.serviceAwardDetails.getSystemQueryAwardDetails("CurrentUserId", this.currentId)
        .toPromise()
        .then((awardDetailsList) => {
          this.myAwardDetailsList = awardDetailsList;
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
      $class: "hansung.ac.kr.assets.AwardDetails",
      
        
          "assetId":this.assetId.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "contestName":this.contestName.value,
        
      
        
          "organizationId":this.organizationId.value,
        
      
        
          "organizationName":this.organizationName.value,
        
      
        
          "dateOfAward":this.dateOfAward.value,
        
      
        
          "transactionTime":this.transactionTime.value,
        
      
        
          "awardGrade":this.awardGrade.value,
        
      
        
          "description":this.description.value,
        
      
        
          "isPublic":this.isPublic.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "contestName":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "transactionTime":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":null
        
      
    });

    return this.serviceAwardDetails.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "contestName":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "transactionTime":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
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
      $class: "hansung.ac.kr.transaction.CreateAwardDetails",
      
        
          "contestName":this.contestName.value,
        
      
        
          "organizationId":this.organizationId.value,
        
      
        
          "organizationName":this.organizationName.value,
        
      
        
          "dateOfAward":this.dateOfAward.value,
        
      
        
          "awardGrade":this.awardGrade.value,
        
      
        
          "description":this.description.value,
        
      
        
          "isPublic":this.isPublic.value,
        
      
        
          "userId":this.userId.value,
        
      
        /*
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        */
      
    };

    this.myForm2.setValue({
      
        
          "contestName":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":null,
        
      
        
          "userId":null,
        
      
        /*
          "transactionId":null,
        
      
        
          "timestamp":null
        */
      
    });

    return this.serviceAwardDetails.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm2.setValue({
      
        
          "contestName":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
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
      $class: "hansung.ac.kr.assets.AwardDetails",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "contestName":this.contestName.value,
          
        
    
        
          
            "organizationId":this.organizationId.value,
          
        
    
        
          
            "organizationName":this.organizationName.value,
          
        
    
        
          
            "dateOfAward":this.dateOfAward.value,
          
        
    
        
          
            "transactionTime":this.transactionTime.value,
          
        
    
        
          
            "awardGrade":this.awardGrade.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "isPublic":this.isPublic.value
          
        
    
    };

    return this.serviceAwardDetails.updateAsset(form.get("assetId").value,this.asset)
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

    return this.serviceAwardDetails.deleteAsset(this.currentId)
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

    return this.serviceAwardDetails.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "contestName":null,
          
        
          
            "organizationId":null,
          
        
          
            "organizationName":null,
          
        
          
            "dateOfAward":null,
          
        
          
            "transactionTime":null,
          
        
          
            "awardGrade":null,
          
        
          
            "description":null,
          
        
          
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
      
        if(result.contestName){
          
            formObject.contestName = result.contestName;
          
        }else{
          formObject.contestName = null;
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
      
        if(result.dateOfAward){
          
            formObject.dateOfAward = result.dateOfAward;
          
        }else{
          formObject.dateOfAward = null;
        }
      
        if(result.transactionTime){
          
            formObject.transactionTime = result.transactionTime;
          
        }else{
          formObject.transactionTime = null;
        }
      
        if(result.awardGrade){
          
            formObject.awardGrade = result.awardGrade;
          
        }else{
          formObject.awardGrade = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
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
        
      
        
          "contestName":null,
        
      
        
          "organizationId":null,
        
      
        
          "organizationName":null,
        
      
        
          "dateOfAward":null,
        
      
        
          "transactionTime":null,
        
      
        
          "awardGrade":null,
        
      
        
          "description":null,
        
      
        
          "isPublic":null 
        
      
      });
  }

}
