import { ObjectId } from "mongodb";

export class Docente {
 
  
    constructor(
      public name: string,
      public lastname: string,
      public age: number,
      public email: string,
      public titulo: string,
      public _id?: ObjectId
    ) {}
  }