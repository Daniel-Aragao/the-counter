import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { Database, getDatabase, ref, query } from 'firebase/database';
import { Observable } from 'rxjs';
import { Log } from '../models/logs';
import { getFireData, setFireData } from '../util/firestore-observable';
import { v1 as guid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private db: Database;

  constructor(app: FirebaseApp) {
    this.db = getDatabase(app);
  }

  getLogs(id: string): Observable<Log[]> {
    const reff = ref(this.db, 'user/' + id);
    const queryy = query(reff);

    return getFireData<Log[]>(queryy);
  }

  addUser(user: Log): Observable<unknown> {
    user.id = guid();
    // const reff = ref(this.db, 'log/' + user.id);

    return setFireData(reff, user);
  }
}
