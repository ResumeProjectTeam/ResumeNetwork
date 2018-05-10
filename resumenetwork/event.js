
'use strict';


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;


class SitechainListener{
        
        constructor() {

                this.NetworkConnection = new BusinessNetworkConnection();
                this.CONNECTION_PROFILE_NAME = "admin@resumenetwork";
		this.Factory = null;
        }


        init() {

                return this.NetworkConnection.connect(this.CONNECTION_PROFILE_NAME)
                .then((result) => {
		        this.Factory = result.getFactory();
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
                        console.log(evt['authorizedParticipantId']);
                        console.log(evt['organizationName']);
                        console.log(evt['dob']);
                        console.log(evt['expirationDate']);
                        console.log(evt['isPublic']);
                        console.log(evt['userId']);
                        console.log(evt['timestamp']);
                        try{	
                            let factory = this.Factory;
                            let createAuthentication = factory.newTransaction('hansung.ac.kr.transaction', 'CreateAuthentication');
                    
                   
        	             createAuthentication.authorizedParticipantId = evt['authorizedParticipantId'];
                             console.log("***************************" + " " +  evt['certificateName'] );
                             console.log(evt['authorizedParticipantType']); 
			     if(evt['authorizedParticipantType'] == "Organization1"){
                                 console.log("***************************" + " " +  evt['certificateName'] );
                                 createAuthentication.resumeName = evt['certificateName'];
                                 createAuthentication.resumeAssetId = getEvent['resumeAssetId'];
        		     }


			     if(evt['authorizedParticipantType'] == "Organization2"){ 
                                  createAuthentication.resumeName = evt['contestName'];
                                  createAuthentication.resumeAssetId = getEvent['resumeAssetId'];
        		     }


			if(evt['authorizedParticipantType'] == "Enterprise"){ 
                             createAuthentication.resumeName = evt['contestName'];
                             createAuthentication.resumeAssetId = getEvent['resumeAssetId'];
        		}



			if(evt['authorizedParticipantType'] == "School"){ 
                             createAuthentication.resumeName = evt['schoolName'];
                             createAuthentication.resumeAssetId = getEvent['resumeAssetId'];
        		}
                        createAuthentication.userId = evt['userId'];
                        console.log("--------------------------------------------------------------------");
			console.log(createAuthentication);
			
			this.NetworkConnection.submitTransaction(createAuthentication);
			}catch(err){
                          console.log("fucking error is    " + err);
                        }
                       
       })
     }

}



var lnr = new SitechainListener();
lnr.init();
lnr.listen();
