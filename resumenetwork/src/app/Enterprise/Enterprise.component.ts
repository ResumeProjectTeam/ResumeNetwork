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
import { EnterpriseService } from './Enterprise.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Enterprise',
	templateUrl: './Enterprise.component.html',
	styleUrls: ['./Enterprise.component.css'],
  providers: [EnterpriseService]
})
export class EnterpriseComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          entId = new FormControl("", Validators.required);
        
  
      
          entName = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          contactAdress = new FormControl("", Validators.required);
        
  
      
          hompage = new FormControl("", Validators.required);
        
  
      
          numberOfemployees = new FormControl("", Validators.required);
        
  
      
          sales = new FormControl("", Validators.required);
        
  
      
          industryCategory = new FormControl("", Validators.required);
        
  
      
          discription = new FormControl("", Validators.required);
        
  
      
          requestResumeList = new FormControl("", Validators.required);
        
  


  constructor(private serviceEnterprise:EnterpriseService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          entId:this.entId,
        
    
        
          entName:this.entName,
        
    
        
          address:this.address,
        
    
        
          contactAdress:this.contactAdress,
        
    
        
          hompage:this.hompage,
        
    
        
          numberOfemployees:this.numberOfemployees,
        
    
        
          sales:this.sales,
        
    
        
          industryCategory:this.industryCategory,
        
    
        
          discription:this.discription,
        
    
        
          requestResumeList:this.requestResumeList
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceEnterprise.getAll()
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
      $class: "hansung.ac.kr.participants.Enterprise",
      
        
          "entId":this.entId.value,
        
      
        
          "entName":this.entName.value,
        
      
        
          "address":this.address.value,
        
      
        
          "contactAdress":this.contactAdress.value,
        
      
        
          "hompage":this.hompage.value,
        
      
        
          "numberOfemployees":this.numberOfemployees.value,
        
      
        
          "sales":this.sales.value,
        
      
        
          "industryCategory":this.industryCategory.value,
        
      
        
          "discription":this.discription.value,
        
      
        
          "requestResumeList":this.requestResumeList.value
        
      
    };

    this.myForm.setValue({
      
        
          "entId":null,
        
      
        
          "entName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "hompage":null,
        
      
        
          "numberOfemployees":null,
        
      
        
          "sales":null,
        
      
        
          "industryCategory":null,
        
      
        
          "discription":null,
        
      
        
          "requestResumeList":null
        
      
    });

    return this.serviceEnterprise.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "entId":null,
        
      
        
          "entName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "hompage":null,
        
      
        
          "numberOfemployees":null,
        
      
        
          "sales":null,
        
      
        
          "industryCategory":null,
        
      
        
          "discription":null,
        
      
        
          "requestResumeList":null 
        
      
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
      $class: "hansung.ac.kr.participants.Enterprise",
      
        
          
        
    
        
          
            "entName":this.entName.value,
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "contactAdress":this.contactAdress.value,
          
        
    
        
          
            "hompage":this.hompage.value,
          
        
    
        
          
            "numberOfemployees":this.numberOfemployees.value,
          
        
    
        
          
            "sales":this.sales.value,
          
        
    
        
          
            "industryCategory":this.industryCategory.value,
          
        
    
        
          
            "discription":this.discription.value,
          
        
    
        
          
            "requestResumeList":this.requestResumeList.value
          
        
    
    };

    return this.serviceEnterprise.updateParticipant(form.get("entId").value,this.participant)
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

    return this.serviceEnterprise.deleteParticipant(this.currentId)
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

    return this.serviceEnterprise.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "entId":null,
          
        
          
            "entName":null,
          
        
          
            "address":null,
          
        
          
            "contactAdress":null,
          
        
          
            "hompage":null,
          
        
          
            "numberOfemployees":null,
          
        
          
            "sales":null,
          
        
          
            "industryCategory":null,
          
        
          
            "discription":null,
          
        
          
            "requestResumeList":null 
          
        
      };



      
        if(result.entId){
          
            formObject.entId = result.entId;
          
        }else{
          formObject.entId = null;
        }
      
        if(result.entName){
          
            formObject.entName = result.entName;
          
        }else{
          formObject.entName = null;
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
      
        if(result.hompage){
          
            formObject.hompage = result.hompage;
          
        }else{
          formObject.hompage = null;
        }
      
        if(result.numberOfemployees){
          
            formObject.numberOfemployees = result.numberOfemployees;
          
        }else{
          formObject.numberOfemployees = null;
        }
      
        if(result.sales){
          
            formObject.sales = result.sales;
          
        }else{
          formObject.sales = null;
        }
      
        if(result.industryCategory){
          
            formObject.industryCategory = result.industryCategory;
          
        }else{
          formObject.industryCategory = null;
        }
      
        if(result.discription){
          
            formObject.discription = result.discription;
          
        }else{
          formObject.discription = null;
        }
      
        if(result.requestResumeList){
          
            formObject.requestResumeList = result.requestResumeList;
          
        }else{
          formObject.requestResumeList = null;
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
      
        
          "entId":null,
        
      
        
          "entName":null,
        
      
        
          "address":null,
        
      
        
          "contactAdress":null,
        
      
        
          "hompage":null,
        
      
        
          "numberOfemployees":null,
        
      
        
          "sales":null,
        
      
        
          "industryCategory":null,
        
      
        
          "discription":null,
        
      
        
          "requestResumeList":null 
        
      
      });
  }

}
