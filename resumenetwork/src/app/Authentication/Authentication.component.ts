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
import { AuthenticationService } from './Authentication.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Authentication',
	templateUrl: './Authentication.component.html',
	styleUrls: ['./Authentication.component.css'],
  providers: [AuthenticationService]
})
export class AuthenticationComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;
  private allAssets;
  private asset;
  private Transaction;
  private currentId;
  private errorMessage;
  private myAuthenticationList;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          resumeDetails = new FormControl("", Validators.required);
        
  
      
          resumeAssetId = new FormControl("", Validators.required);
        
  
      
          authorizedParticipantId = new FormControl("", Validators.required);
        
  
      
          authenticationTime = new FormControl("", Validators.required);
        
  
      
          userId = new FormControl("", Validators.required);
        
  


  constructor(private serviceAuthentication:AuthenticationService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          ownerId:this.ownerId,
        
    
        
          resumeDetails:this.resumeDetails,
        
    
        
          resumeAssetId:this.resumeAssetId,
        
    
        
          authorizedParticipantId:this.authorizedParticipantId,
        
    
        
          authenticationTime:this.authenticationTime
        
    
    });

    this.myForm2 = fb.group({
    
        
      authorizedParticipantId:this.authorizedParticipantId,
    

    
      resumeDetails:this.resumeDetails,
    

    
      resumeAssetId:this.resumeAssetId,
    

    
      userId:this.userId,
    

    
      /*
      authorizedParticipantType:this.authorizedParticipantType,
    

    
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
    return this.serviceAuthentication.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];
        this.serviceAuthentication.getSystemQueryAuthentication("CurrentUserId", this.currentId)
          .toPromise()
          .then((authenticationList) => {
            this.myAuthenticationList = authenticationList;
          })
      })
      .catch((error) => {
        console.log(error);
      })

      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
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
      $class: "hansung.ac.kr.assets.Authentication",
      
        
          "assetId":this.assetId.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "resumeDetails":this.resumeDetails.value,
        
      
        
          "resumeAssetId":this.resumeAssetId.value,
        
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "authenticationTime":this.authenticationTime.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "resumeDetails":null,
        
      
        
          "resumeAssetId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "authenticationTime":null
        
      
    });

    return this.serviceAuthentication.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "ownerId":null,
        
      
        
          "resumeDetails":null,
        
      
        
          "resumeAssetId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "authenticationTime":null 
        
      
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
      $class: "hansung.ac.kr.transaction.CreateAuthentication",
      
        
          "authorizedParticipantId":this.authorizedParticipantId.value,
        
      
        
          "resumeDetails":this.resumeDetails.value,
        
      
        
          "resumeAssetId":this.resumeAssetId.value,
        
      
        
          "userId":this.userId.value,
        
      
        /*
          "authorizedParticipantType":this.authorizedParticipantType.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      */
    };

    this.myForm2.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "resumeDetails":null,
        
      
        
          "resumeAssetId":null,
        
      
        
          "userId":null,
        
      
        /*
          "authorizedParticipantType":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
          */
        
      
    });

    return this.serviceAuthentication.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "authorizedParticipantId":null,
        
      
        
          "resumeDetails":null,
        
      
        
          "resumeAssetId":null,
        
      
        
          "userId":null,
        
      
        /*
          "authorizedParticipantType":null,
        
      
        
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
      $class: "hansung.ac.kr.assets.Authentication",
      
        
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "resumeDetails":this.resumeDetails.value,
          
        
    
        
          
            "resumeAssetId":this.resumeAssetId.value,
          
        
    
        
          
            "authorizedParticipantId":this.authorizedParticipantId.value,
          
        
    
        
          
            "authenticationTime":this.authenticationTime.value
          
        
    
    };

    return this.serviceAuthentication.updateAsset(form.get("assetId").value,this.asset)
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

    return this.serviceAuthentication.deleteAsset(this.currentId)
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

    return this.serviceAuthentication.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "ownerId":null,
          
        
          
            "resumeDetails":null,
          
        
          
            "resumeAssetId":null,
          
        
          
            "authorizedParticipantId":null,
          
        
          
            "authenticationTime":null 
          
        
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
      
        if(result.resumeDetails){
          
            formObject.resumeDetails = result.resumeDetails;
          
        }else{
          formObject.resumeDetails = null;
        }
      
        if(result.resumeAssetId){
          
            formObject.resumeAssetId = result.resumeAssetId;
          
        }else{
          formObject.resumeAssetId = null;
        }
      
        if(result.authorizedParticipantId){
          
            formObject.authorizedParticipantId = result.authorizedParticipantId;
          
        }else{
          formObject.authorizedParticipantId = null;
        }
      
        if(result.authenticationTime){
          
            formObject.authenticationTime = result.authenticationTime;
          
        }else{
          formObject.authenticationTime = null;
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
        
      
        
          "resumeDetails":null,
        
      
        
          "resumeAssetId":null,
        
      
        
          "authorizedParticipantId":null,
        
      
        
          "authenticationTime":null 
        
      
      });
  }

}
