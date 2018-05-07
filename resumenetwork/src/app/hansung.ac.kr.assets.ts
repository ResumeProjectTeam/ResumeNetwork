import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace hansung.ac.kr.assets{
   export class ResumeInfoUser extends Asset {
      assetId: string;
      ownerId: string;
      name: string;
      dob: Date;
      supportField: string;
      salaryRequirement: string;
      majorActivities: string;
      socialExperience: string;
      skillsAndCapabilities: string;
      isPublic: boolean;
   }
   export class Certificate extends Asset {
      assetId: string;
      ownerId: string;
      certificateName: string;
      certificateScore: number;
      organizationId: string;
      organizationName: string;
      dob: Date;
      expirationDate: Date;
      transactionTime: Date;
      isPublic: boolean;
   }
   export class AwardDetails extends Asset {
      assetId: string;
      ownerId: string;
      contestName: string;
      organizationId: string;
      organizationName: string;
      dateOfAward: Date;
      transactionTime: Date;
      awardGrade: string;
      description: string;
      isPublic: boolean;
   }
   export class UserInfoInEnt extends Asset {
      assetId: string;
      ownerId: string;
      enterpriseId: string;
      enterpriseName: string;
      userPosition: string;
      performingTask: string;
      dateOfEmployment: Date;
      retirementDate: Date;
      transactionTime: Date;
      isPublic: boolean;
   }
   export class UserInfoInSch extends Asset {
      assetId: string;
      ownerId: string;
      schoolId: string;
      schoolName: string;
      entranceDate: Date;
      graduationDate: Date;
      transactionTime: Date;
      majorField: string;
      gradeAverage: number;
      isPublic: boolean;
   }
   export class Address {
      street: string;
      house: string;
      city: string;
      county: string;
      country: string;
      zip: string;
   }
// }
