import { DatabaseReference, DataSnapshot, onValue, Query, set } from "@firebase/database";
import { from, Observable } from "rxjs";

export function getFireData<T>(query: Query) {
  const obs = new Observable<T>(subs => {
    const unsubs = onValue(query, (dataSnapshot: DataSnapshot) => {
      subs.next(dataSnapshot.val());
    }, (error: Error) => {
      subs.error(error);
    });

    subs.add(() => {
      unsubs();
    })
  });

  return obs;
}

export function setFireData(reference: DatabaseReference, value: unknown) {
  return new Observable(subs => {
    set(reference, value).then(() => {
      subs.next();
    }).catch(() => {
      subs.error();
    }).finally(() => {
      subs.complete();
    });
  });
}
