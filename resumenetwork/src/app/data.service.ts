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

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Certificate, AwardDetails, UserInfoInEnt, UserInfoInSch, ResumeInfoUser } from './hansung.ac.kr.assets';


@Injectable()
export class DataService<Type> {
    private resolveSuffix: string = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.actionUrl = '/api/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll(ns: string): Observable<Type[]> {
        //console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.http.get(`${this.actionUrl}${ns}`)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public getSingle(ns: string, id: string): Observable<Type> {
        //console.log('GetSingle ' + ns);

        return this.http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public add(ns: string, asset: Type): Observable<Type> {
       /*
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);
        */
        return this.http.post(this.actionUrl + ns, asset)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
        /*
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        */
        return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public delete(ns: string, id: string): Observable<Type> {
        //console.log('Delete ' + ns);

        return this.http.delete(this.actionUrl + ns + '/' + id)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }



    public getSystemIdentities(): Observable<Type> {
        //console.log("system Identities : " + this.actionUrl +   "system/identities");

        return this.http.get(this.actionUrl + "system/identities")
          .map(this.extractData)
          .catch(this.handleError);
    }

    public getSystemPing() :Observable<JSON> {
        //console.log("system ping : " + this.actionUrl +   "system/ping");
        return this.http.get(this.actionUrl + "system/ping")
          .map(this.extractData)
          .catch(this.handleError);

    }


    public getSystemQueryResumeInfoUser(ns: string,  parameterName: string, param: string): Observable<ResumeInfoUser[]> {
        //console.log("system query : " + this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param);

        return this.http.get(this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param)
          .map(this.extractData)
          .catch(this.handleError);
    }

    
    public getSystemQueryCertificate(ns: string,  parameterName: string, param: string): Observable<Certificate[]> {
        //console.log("system query : " + this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param);

        return this.http.get(this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public getSystemQueryAwardDetails(ns: string,  parameterName: string, param: string): Observable<AwardDetails[]> {
        //console.log("system query : " + this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param);

        return this.http.get(this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public getSystemQueryUserInfoInEnt(ns: string,  parameterName: string, param: string): Observable<UserInfoInEnt[]> {
        //console.log("system query : " + this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param);

        return this.http.get(this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param)
          .map(this.extractData)
          .catch(this.handleError);
    }

    public getSystemQueryUserInfoInSch(ns: string,  parameterName: string, param: string): Observable<UserInfoInSch[]> {
        //console.log("system query : " + this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param);

        return this.http.get(this.actionUrl + "queries/" + ns + '?' + parameterName + "=" + param)
          .map(this.extractData)
          .catch(this.handleError);
    }

}
