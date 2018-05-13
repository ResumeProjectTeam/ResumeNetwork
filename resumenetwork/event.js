
'use strict';


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

var CORE_NAMESPACE_PREFIX = "hansung.ac.kr";
var PARTICIPANTS = "participants";
var ASSETS = "assets";
var TRANSACTION = "transaction";
var NAMESPACE_USER = CORE_NAMESPACE_PREFIX + "." + PARTICIPANTS + "." + "User";
var NAMESPACE_ORG = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Organization";
var NAMESPACE_ENT = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "Enterprise";
var NAMESPACE_INS = CORE_NAMESPACE_PREFIX + "."  + PARTICIPANTS + "." + "School";





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
                  
                        try{	
                            let factory = this.Factory;


                            let addRequestUser =  factory.newTransaction('hansung.ac.kr.transaction', 'AddRequestUser');

                             addRequestUser.requestUserId = evt['userId'];
                             addRequestUser.targetParticipantId  =  evt['authorizedParticipantId'];
			     addRequestUser.requestResumeAssetId = getEvent['resumeAssetId'];


                             console.log(evt['authorizedParticipantType']);
                             console.log(evt['authorizedParticipantId']);
                             console.log(getEvent['resumeAssetId']);

                              
		             if(evt['authorizedParticipantType'] == "Organization1"){
                                 addRequestUser.requestDetails = evt['certificateName'];
                                 addRequestUser.targetParticipantType = NAMESPACE_ORG;
                
                             }
 
                             if(evt['authorizedParticipantType'] == "Organization2"){
                                 addRequestUser.requestDetails = evt['contestName'];
                                 addRequestUser.targetParticipantType = NAMESPACE_ORG;
		         
                             }


                             if(evt['authorizedParticipantType'] == "Enterprise"){
                                 addRequestUser.requestDetails = evt['EnterpriseName'];
                                 addRequestUser.targetParticipantType = NAMESPACE_ENT;
                                
                             }

                             if(evt['authorizedParticipantType'] == "School"){
                                addRequestUser.requestDetails = evt['schoolName'];
                                addRequestUser.targetParticipantType = NAMESPACE_SCH;
                             
                             }


                            this.NetworkConnection.submitTransaction(addRequestUser);

/*
                            let createAuthentication = factory.newTransaction('hansung.ac.kr.transaction', 'CreateAuthentication');
                    
                   
        	             createAuthentication.authorizedParticipantId = evt['authorizedParticipantId'];
                      
                   
			     if(evt['authorizedParticipantType'] == "Organization1"){
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
			console.log(createAuthentication);
			
			this.NetworkConnection.submitTransaction(createAuthentication);


                        */
			}catch(err){
                          console.log("error in event.js : " + err);
                        }
                       
       })
     }

}



var lnr = new SitechainListener();
lnr.init();
lnr.listen();
