import { db } from './firebase';

// User API

export const doCreateUser = (id, email, password) =>
  db.ref(`users/${id}`).set({
    email,
    password,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// export const getDenuncias = () =>
//   db.ref('denuncias').on('child_added', snapshot