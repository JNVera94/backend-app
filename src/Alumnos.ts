export class Alumno {
  private static generateRandomLegajo(): string {
    const randomNumber = Math.floor(Math.random() * 10000);
    return randomNumber.toString();
  }

  constructor(
    public name: string,
    public lastname: string,
    public age: number,
    public email: string,
    public legajo: string = Alumno.generateRandomLegajo()
  ) {}
}