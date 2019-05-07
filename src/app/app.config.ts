import { Timestamp } from "rxjs/internal/operators/timestamp";


export const firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDv9zk84ed6_ckRorvxhVnTfecLs_aSbFw",
      authDomain: "entrenador-personal-20e1f.firebaseapp.com",
      databaseURL: "https://entrenador-personal-20e1f.firebaseio.com",
      projectId: "entrenador-personal-20e1f",
      storageBucket: "entrenador-personal-20e1f.appspot.com",
      messagingSenderId: "150980917345"
  },
  cliente_endpoint: "cliente",
  instructor_endpoint: "instructor"
};


/*  configuracion pruevas 
    apiKey: "AIzaSyCM_hCpwHHNA82t0GQhnMhAAfmEdsXORRk",
    authDomain: "good-me-pruevas.firebaseapp.com",
    databaseURL: "https://good-me-pruevas.firebaseio.com",
    projectId: "good-me-pruevas",
    storageBucket: "good-me-pruevas.appspot.com",
    messagingSenderId: "677999497931"
////////// Configuracion usuarios
      apiKey: "AIzaSyDv9zk84ed6_ckRorvxhVnTfecLs_aSbFw",
      authDomain: "entrenador-personal-20e1f.firebaseapp.com",
      databaseURL: "https://entrenador-personal-20e1f.firebaseio.com",
      projectId: "entrenador-personal-20e1f",
      storageBucket: "entrenador-personal-20e1f.appspot.com",
      messagingSenderId: "150980917345"

*/

export interface Cliente {
  email: string;
  nombre: string;
  foto: string;
  peso: number;
  altura: number;
  telefono: number;
  genero: boolean;
  fechanac: Timestamp<any>;
  instructor: boolean,
  descorta: string
}

export interface Instructor {
  message: string;
  pair: string;
  sender: string;
  time: number;
}