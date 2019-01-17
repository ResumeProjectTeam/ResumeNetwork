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



Create a `SampleParticipant` participant:

```
{
  "$class": "org.acme.sample.SampleParticipant",
  "participantId": "Toby",
  "firstName": "Tobias",
  "lastName": "Hunter"
}
```

Create a `SampleAsset` asset:

```
{
  "$class": "org.acme.sample.SampleAsset",
  "assetId": "assetId:1",
  "owner": "resource:org.acme.sample.SampleParticipant#Toby",
  "value": "original value"
}
```

Submit a `SampleTransaction` transaction:

```
{
  "$class": "org.acme.sample.SampleTransaction",
  "asset": "resource:org.acme.sample.SampleAsset#assetId:1",
  "newValue": "new value"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `SampleEvent` has been emitted. As a result, the value of the `assetId:1` should now be `new value` in the Asset Registry.

Congratulations!
