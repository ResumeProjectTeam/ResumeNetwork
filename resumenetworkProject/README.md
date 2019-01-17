# ResumeNetwork Network

This business network defines:

**Participant**
`User`
`Organization`
`Enterprise`
`School`


**Asset**
`Authentication`
`ResumeInfoUser`
`Certificate`
`AwardDetails`
`UserInfoInOrg`
`UserInfoInEnt`
`UserInfoInSch`


**Transaction**
`AddRequestUser`
`RevokeRequestUser`
`CreateAuthentication`
`CreateResumeInfoUser`
`CreateCertificate`
`CreateAwardDetails`
`CreateUserInfoInEnt`
`CreateUserInfoInSch`

**Event**
`SendEvent`
`UserEvent` 
`OrganizationEvent` 
`EnterpriseEvent`
`SchoolEvent` 



```typescript
/**
 * @param {hansung.ac.kr.transaction.CreateAuthentication }  txCreateAuthentication   - the member to be processed
 * @transaction
 */
function CreateAuthentication  (txCreateAuthentication ) {
   var actionDateTime = new Date();
   var me = getCurrentParticipant();
   var factory = getFactory();
   var indexf = -1;

   if(!me) {
        throw new Error('can not find Participant');
    }


   return getAssetRegistry(NAMESAPCE_ASSETS + ".Authentication")
  .then(function (allAuthenticationRegistry) {


      var newAuthentication = factory.newResource(NAMESAPCE_ASSETS, "Authentication", txCreateAuthentication.resumeAssetId );
       newAuthentication.authorizedParticipantId = txCreateAuthentication.authorizedParticipantId;
       newAuthentication.approvalStatus = "미인증";
       newAuthentication.resumeDetails = txCreateAuthentication.resumeDetails;
       newAuthentication.resumeAssetId =  txCreateAuthentication.resumeAssetId;
       newAuthentication.authenticationTime = actionDateTime;
       newAuthentication.ownerId = txCreateAuthentication.userId;
       return allAuthenticationRegistry.add(newAuthentication);
       })
        .catch(function (error){
        throw error;
       });
}

```
