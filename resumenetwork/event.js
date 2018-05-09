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



'use strict';


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;


class SitechainListener{

	constructor() {

        	this.NetworkConnection = new BusinessNetworkConnection();
        	this.CONNECTION_PROFILE_NAME = "admin@resumenetwork";
    	}


	init() {

        	return this.NetworkConnection.connect(this.CONNECTION_PROFILE_NAME)
      		.then((result) => {
          		this.businessNetworkDefinition = result;
          		//LOG.info(this.businessNetworkDefinition.getIdentifier());
      		})
      		// and catch any exceptions that are triggered
      		.catch(function (error) {
          		throw error;
      		});

    	}


	/** Listen for the sale transaction events
     	*/
     	listen(){
       		this.NetworkConnection.on('event',(getEvent)=>{

                        
			var temp = JSON.stringify(getEvent['txForUser']);
			var evt = JSON.parse(temp);
			console.log(evt['certificateName']);
			console.log(evt['certificateScore']);
			console.log(evt['organizationId']);
                        console.log(evt['organizationName']);
			console.log(evt['dob']);
			console.log(evt['expirationDate']);
			console.log(evt['isPublic']);
			console.log(evt['userId']);
			console.log(evt['timestamp']);
       });
     }


}



var lnr = new SitechainListener();
lnr.init();
lnr.listen()
