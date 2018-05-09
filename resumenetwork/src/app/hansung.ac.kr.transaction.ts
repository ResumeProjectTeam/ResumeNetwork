import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Certificate,AwardDetails,UserInfoInEnt,UserInfoInSch} from './hansung.ac.kr.assets';
import {User} from './hansung.ac.kr.participants';
// export namespace hansung.ac.kr.transaction{
   export abstract class TxForOrg extends Transaction {
      orgId: string;
   }
   export abstract class TxForEnt extends Transaction {
      entId: string;
   }
   export abstract class TxForSch extends Transaction {
      schId: string;
   }
   export abstract class TxForUser extends Transaction {
      userId: string;
   }
   export class AddRequestUser extends TxForUser {
      user: User;
   }
   export class RevokeRequestUser extends TxForUser {
   }
   export class CreateResumeInfoUser extends TxForUser {
      dob: Date;
      name: string;
      supportField: string;
      salaryRequirement: string;
      majorActivities: string;
      socialExperience: string;
      skillsAndCapabilities: string;
      isPublic: boolean;
   }
   export class CreateCertificate extends TxForUser {
      certificateName: string;
      certificateScore: number;
      organizationId: string;
      organizationName: string;
      dob: Date;
      expirationDate: Date;
      isPublic: boolean;
   }
   export class CreateAwardDetails extends TxForUser {
      contestName: string;
      organizationId: string;
      organizationName: string;
      dateOfAward: Date;
      awardGrade: string;
      description: string;
      isPublic: boolean;
   }
   export class CreateUserInfoInEnt extends TxForUser {
      enterpriseId: string;
      enterpriseName: string;
      userPosition: string;
      performingTask: string;
      dateOfEmployment: Date;
      retirementDate: Date;
      isPublic: boolean;
   }
   export class CreateUserInfoInSch extends TxForUser {
      schoolId: string;
      schoolName: string;
      entranceDate: Date;
      graduationDate: Date;
      majorField: string;
      gradeAverage: number;
      isPublic: boolean;
   }
   export class SendEvent extends Event {
      certificate: Certificate;
      awardDetails: AwardDetails;
      userInfoInEnt: UserInfoInEnt;
      userInfoInSch: UserInfoInSch;
   }
   export class UserEvent extends Event {
      txForUser: TxForUser;
   }
   export class OrganizationEvent extends Event {
      txForOrg: TxForOrg;
   }
   export class EnterpriseEvent extends Event {
      txForEnt: TxForEnt;
   }
   export class SchoolEvent extends Event {
      txForSch: TxForSch;
   }
// }
