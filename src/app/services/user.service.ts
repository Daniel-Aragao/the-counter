import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Database, getDatabase, query, ref } from 'firebase/database';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { getFireData, setFireData } from '../util/firestore-observable';
import { v1 as guid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private db: Database;

  constructor(app: FirebaseApp) {
    this.db = getDatabase(app);
  }

  getUser(id: string): Observable<User> {
    const reff = ref(this.db, 'user/' + id);
    const queryy = query(reff);

    return getFireData<User>(queryy);
  }

  setUser(user: User): Observable<unknown> {
    user.id = guid();
    const reff = ref(this.db, 'user/' + user.id);

    return setFireData(reff, user);
  }
}
