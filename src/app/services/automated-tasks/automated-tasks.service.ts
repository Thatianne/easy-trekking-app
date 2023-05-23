import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AutomatedTasksService {

  constructor(private _httpClient: HttpClient) {}

  inviteTouristGuides(): Observable<void> {
    return this._httpClient.get<void>(environment.inviteTouristGuides);
  }

  doneGroups(): Observable<void> {
    return this._httpClient.get<void>(environment.doneGroups);
  }

  cancelGroups(): Observable<void> {
    return this._httpClient.get<void>(environment.cancelGroups);
  }

}
