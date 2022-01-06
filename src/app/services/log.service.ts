import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private db: Database;

  constructor(app: FirebaseApp) {
    this.db = getDatabase(app);
  }

  getLog(id: string): Observable<User> {
    const reff = ref(this.db, 'user/' + id);
    const queryy = query(reff);

    return getFireData<User>(queryy);
  }

  addUser(user: User): Observable<unknown> {
    user.id = guid();
    const reff = ref(this.db, 'user/' + user.id);

    return setFireData(reff, user);
  }
}
