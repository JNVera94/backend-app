export class Alumno {
    static generateRandomLegajo() {
        const randomNumber = Math.floor(Math.random() * 10000);
        return randomNumber.toString();
    }
    constructor(name, lastname, age, email, legajo = Alumno.generateRandomLegajo()) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.legajo = legajo;
    }
}
//# sourceMappingURL=Alumnos.js.map