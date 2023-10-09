import { ObjectId } from "mongodb";

export class Materia {
 
  
    constructor(
      public name: string,
      public totalhours: number,
      public email: string,
      public nivel: string,
      public _id?: ObjectId
    ) {}
  }