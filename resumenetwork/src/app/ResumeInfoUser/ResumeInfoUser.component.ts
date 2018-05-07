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
import { ResumeInfoUserService } from './ResumeInfoUser.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-ResumeInfoUser',
  templateUrl: './ResumeInfoUser.component.html',
  styleUrls: ['./ResumeInfoUser.component.css'],
  providers: [ResumeInfoUserService]
})
export class ResumeInfoUserComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  private allAssets;
  private asset;
  private Transaction
  private currentId;
  private errorMessage;
  private myResumeInfoUser;


  name = new FormControl("", Validators.required);


  assetId = new FormControl("", Validators.required);


  ownerId = new FormControl("", Validators.required);



  dob = new FormControl("", Validators.required);



  supportField = new FormControl("", Validators.required);



  salaryRequirement = new FormControl("", Validators.required);



  majorActivities = new FormControl("", Validators.required);



  socialExperience = new FormControl("", Validators.required);



  skillsAndCapabilities = new FormControl("", Validators.required);



  isPublic = new FormControl("", Validators.required);



  userId = new FormControl("test", Validators.required);



  transactionId = new FormControl("", Validators.required);



  timestamp = new FormControl("", Validators.required);




  constructor(private serviceResumeInfoUser: ResumeInfoUserService, fb: FormBuilder) {
    this.myForm = fb.group({


      name: this.name,


      assetId: this.assetId,


      ownerId: this.ownerId,



      dob: this.dob,



      supportField: this.supportField,



      salaryRequirement: this.salaryRequirement,



      majorActivities: this.majorActivities,



      socialExperience: this.socialExperience,



      skillsAndCapabilities: this.skillsAndCapabilities,



      isPublic: this.isPublic


    });

    this.myForm2 = fb.group({


      name: this.name,


      dob: this.dob,



      supportField: this.supportField,



      salaryRequirement: this.salaryRequirement,



      majorActivities: this.majorActivities,



      socialExperience: this.socialExperience,



      skillsAndCapabilities: this.skillsAndCapabilities,



      isPublic: this.isPublic,



      userId: this.userId,


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
    return this.serviceResumeInfoUser.getSystemPing()
      .toPromise()
      .then((result) => {
        var Id;
        Id = result['participant'];
        Id = Id.split('#');
        console.log(Id[1]);
        this.currentId = Id[1];
        this.serviceResumeInfoUser.getSystemQueryResumeInfoUser("CurrentUserId", this.currentId)
          .toPromise()
          .then((resumeInfoUser) => {
            this.myResumeInfoUser = resumeInfoUser;
          })
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
      $class: "hansung.ac.kr.assets.ResumeInfoUser",


      "assetId": this.assetId.value,


      "ownerId": this.ownerId.value,


      "name": this.name.value,



      "dob": this.dob.value,



      "supportField": this.supportField.value,



      "salaryRequirement": this.salaryRequirement.value,



      "majorActivities": this.majorActivities.value,



      "socialExperience": this.socialExperience.value,



      "skillsAndCapabilities": this.skillsAndCapabilities.value,



      "isPublic": this.isPublic.value


    };

    this.myForm.setValue({


      "assetId": null,


      "ownerId": null,



      "name": null,



      "dob": null,



      "supportField": null,



      "salaryRequirement": null,



      "majorActivities": null,



      "socialExperience": null,



      "skillsAndCapabilities": null,



      "isPublic": null


    });

    return this.serviceResumeInfoUser.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({


          "assetId": null,



          "ownerId": null,


          "name": null,



          "dob": null,



          "supportField": null,



          "salaryRequirement": null,



          "majorActivities": null,



          "socialExperience": null,



          "skillsAndCapabilities": null,



          "isPublic": null


        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }



  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "hansung.ac.kr.transaction.CreateResumeInfoUser",


      "dob": this.dob.value,


      "name": this.name.value,



      "supportField": this.supportField.value,



      "salaryRequirement": this.salaryRequirement.value,



      "majorActivities": this.majorActivities.value,



      "socialExperience": this.socialExperience.value,



      "skillsAndCapabilities": this.skillsAndCapabilities.value,



      "isPublic": this.isPublic.value,



      "userId": this.userId.value,


      /*
        "transactionId":this.transactionId.value,
      
    
      
        "timestamp":this.timestamp.value
      */

    };

    this.myForm2.setValue({


      "name": null,


      "dob": null,



      "supportField": null,



      "salaryRequirement": null,



      "majorActivities": null,



      "socialExperience": null,



      "skillsAndCapabilities": null,



      "isPublic": null,



      "userId": null,


      /*
        "transactionId":null,
      
    
      
        "timestamp":null
      */

    });

    return this.serviceResumeInfoUser.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm2.setValue({


          "name": null,


          "dob": null,



          "supportField": null,



          "salaryRequirement": null,



          "majorActivities": null,



          "socialExperience": null,



          "skillsAndCapabilities": null,



          "isPublic": null,



          "userId": null,


          /*
            "transactionId":null,
          
        
          
            "timestamp":null 
          */

        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "hansung.ac.kr.assets.ResumeInfoUser",



      "ownerId": this.ownerId.value,



      "name": this.name.value,



      "dob": this.dob.value,





      "supportField": this.supportField.value,





      "salaryRequirement": this.salaryRequirement.value,





      "majorActivities": this.majorActivities.value,





      "socialExperience": this.socialExperience.value,





      "skillsAndCapabilities": this.skillsAndCapabilities.value,





      "isPublic": this.isPublic.value



    };

    return this.serviceResumeInfoUser.updateAsset(form.get("assetId").value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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


  deleteAsset(): Promise<any> {

    return this.serviceResumeInfoUser.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceResumeInfoUser.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "assetId": null,


          "ownerId": null,


          "name": null,


          "dob": null,



          "supportField": null,



          "salaryRequirement": null,



          "majorActivities": null,



          "socialExperience": null,



          "skillsAndCapabilities": null,



          "isPublic": null


        };




        if (result.assetId) {

          formObject.assetId = result.assetId;

        } else {
          formObject.assetId = null;
        }

        if (result.ownerId) {

          formObject.ownerId = result.ownerId;

        } else {
          formObject.ownerId = null;
        }

        if (result.name) {

          formObject.name = result.name;

        } else {
          formObject.name = null;
        }


        if (result.dob) {

          formObject.dob = result.dob;

        } else {
          formObject.dob = null;
        }

        if (result.supportField) {

          formObject.supportField = result.supportField;

        } else {
          formObject.supportField = null;
        }

        if (result.salaryRequirement) {

          formObject.salaryRequirement = result.salaryRequirement;

        } else {
          formObject.salaryRequirement = null;
        }

        if (result.majorActivities) {

          formObject.majorActivities = result.majorActivities;

        } else {
          formObject.majorActivities = null;
        }

        if (result.socialExperience) {

          formObject.socialExperience = result.socialExperience;

        } else {
          formObject.socialExperience = null;
        }

        if (result.skillsAndCapabilities) {

          formObject.skillsAndCapabilities = result.skillsAndCapabilities;

        } else {
          formObject.skillsAndCapabilities = null;
        }

        if (result.isPublic) {

          formObject.isPublic = result.isPublic;

        } else {
          formObject.isPublic = null;
        }


        this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({


      "assetId": null,


      "ownerId": null,


      "name":null,


      "dob": null,



      "supportField": null,



      "salaryRequirement": null,



      "majorActivities": null,



      "socialExperience": null,



      "skillsAndCapabilities": null,



      "isPublic": null


    });
  }

}
