import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase-config';

const login = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return resolve('Seja bem vindo(a)!');
      })
      .catch((error) => {
        let message;

        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Email inválido!';
            break;

          case 'auth/user-not-found':
            message = 'Email não cadastrado!';
            break;

          case 'auth/wrong-password':
            message = 'Senha incorreta!';
            break;

          default:
            message = 'Erro ao realizar o login.';
            break;
        }
        reject(message);
      });
  });
};

const signUp = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve('Cadastro efetuado com sucesso!');
      })
      .catch((error) => {
        let message;

        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'Este email já está cadastrado!';
            break;

          default:
            message = 'Erro ao realizar o cadastro.';
            break;
        }
        reject(message);
      });
  });
};

export { login, signUp };
