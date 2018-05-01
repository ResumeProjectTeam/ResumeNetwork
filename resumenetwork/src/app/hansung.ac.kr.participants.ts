import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Address} from './hansung.ac.kr.assets';
// export namespace hansung.ac.kr.participants{
   export class User extends Participant {
      userId: string;
      userName: string;
      dob: Date;
      address: Address;
      phoneNumber: string;
      email: string;
      isPublic: boolean;
      isHuntingForJob: boolean;
   }
   export class Organization extends Participant {
      orgId: string;
      orgName: string;
      address: Address;
      contactAdress: string;
      homepage: string;
      discription: string;
      requestUser: User[];
   }
   export class Enterprise extends Participant {
      entId: string;
      entName: string;
      address: Address;
      contactAdress: string;
      hompage: string;
      numberOfemployees: string;
      sales: string;
      industryCategory: IndustryCategory;
      discription: string;
      requestUser: User[];
   }
   export class School extends Participant {
      schId: string;
      schName: string;
      address: Address;
      contactAdress: string;
      hompage: string;
      requestUser: User[];
   }
   export enum IndustryCategory {
      Synthesis,
      ProduceAndChemistry,
      ServiceBusiness,
      BankFinancial,
      IT,
      Media,
      MedicalAndPharmaceuticals,
      Construction,
      SaleAndDistribution,
      Education,
   }
// }
