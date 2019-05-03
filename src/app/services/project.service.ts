import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()

export class ProjectService {
    public url: string;
    constructor(private http: HttpClient) {
        this.url = Global.url;
    }

    saveProject(project: Project): Observable<any> {
        const params = JSON.stringify(project);
        const headers = new HttpHeaders().set('content-type', 'application/json');

        return this.http.post(this.url + 'save-project', params, {headers});
    }

    showProjects(): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.http.get(this.url + 'projects', {headers});
    }

    getProject(id): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.http.get(this.url + 'project/' + id, {headers});
    }

    updateProject(project): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        const params = JSON.stringify(project);
        return this.http.put(this.url + 'project/' + project._id, params, {headers});
    }

    deleteProject(id): Observable<any> {
        const headers = new HttpHeaders().set('content-type', 'application/json');
        return this.http.delete(this.url + 'project/' + id, {headers});
    }
}
