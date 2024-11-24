import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";


@Injectable()
export class TaskService{

    constructor(private httpclient: HttpClient, private router:Router){}

    get_tasks(){
        return this.httpclient.get('http://localhost:8000/api/tasks');
    }

    create_task(task:any){
        return this.httpclient.post('http://localhost:8000/api/tasks', task);
    }

    delete_task(idtask:any){
        return this.httpclient.delete(`http://localhost:8000/api/tasks/${idtask}`);
    }
    
}