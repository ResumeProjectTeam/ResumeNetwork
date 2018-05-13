# ResumeNetwork


합칠때
{
Certificate, AwardDetails, UserInfoInEnt, UserInfoInSch, Authentication 컴포넌트 전체

data.service 

hansung.ac.kr.assets.ts

hansung.ac.kr.participants.ts

hansung.ac.kr.transaction.ts

User, Organization, Enterprise, School 컴포넌트 전체

}
필요 ( {}의 전부 변경사항이 있고 새로 추가된게 있음)

위의 파일들을 덮어씌울것



밑의 내용들은 복잡해서 내가 마저 해야할거 같음
--------------------------------------------------------------------------------------------------------------------------------


테스트전에 반드시 rest-server에서 인증받을 기관 participant를 post로 만들어내야함

현재 인증기능이 certificate 에셋에만 적용되어 있음.

angular 페이지의 certificate 리스트에 isAuthentication 인증완료 글자가 밀려 써지는 문제 있음


event.js파일을  node_modules이 있는곳에서 node event.js 명령어를 실행하고
앵귤러에서 certificate 페이지에서 createAsset을 하면
event.js에서 이벤트를 구독하여 AddRequestUser 트랜잭션을 실행하여 
requestResumeList에 해당 certificate의 내용이 추가된다.


  export class Organization extends Participant {
  
  
      orgId: string;
      
      
      orgName: string;
      
      
      address: Address;
      
      
      contactAdress: string;
      
      
      homepage: string;
      
      
      discription: string;
      
      
      requestResumeList: RequestResume[];
      
      
   }
   
   Organization을 예로 들면
   requestResumeList 필드에 인증요청을 받은 이력내용들이 적혀있다.
   이 이력 내용들을 참고하여 Authentication 컴포넌트의 component.ts의 addTransaction 같은 기능을 실행하게 버튼이 필요
   
