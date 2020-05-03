const advancedTypes = () => {
  type Admin = {
    name: string;
    privilages: string[];
  };
  type Entry = boolean | string[]
  type Employee = {
    name: string;
    startDate: Date;
    // banana: SourceFile
  };
  type ElevatedEmployee = Admin & Employee;

  const e1: ElevatedEmployee = {
    name: "Cl",
    privilages: ["create-server"],
    startDate: new Date(),
  };

  type Combinable = string | number;
  type Numeric = number | boolean;

  type Universal = Combinable & Numeric;
  const n: Universal = 3;

  // function overload
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: Combinable, b: Combinable) {
    //typeguard
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }

  const result = add(1, 5);
  const result2 = add("cl", "b") as string;
  // result2.split('');

  type UnknownEmployee = Employee | Admin;

  function printEmployeeInfo(emp: UnknownEmployee) {
    console.log(`name: ${emp.name}`);

    // type guard
    if ("privilages" in emp) {
      console.log(`privilages: ${emp.privilages}`);
    }
    if ("startDate" in emp) {
      console.log(`date : ${emp.startDate}`);
    }
  }

  printEmployeeInfo(e1);

  class Car {
    drive() {
      console.log("Driving...");
    }
  }
  class Truck {
    drive() {
      console.log("Driving truck...");
    }
    loadCargo(amount: number) {
      console.log(`loading cargo: ${amount}`);
    }
  }

  type Vehicle = Car | Truck;
  const v1 = new Car();
  const v2 = new Truck();

  function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if ("loadCargo" in vehicle) {
      vehicle.loadCargo(1000);
    }
    if (vehicle instanceof Truck) {
      vehicle.loadCargo(999);
    }
  }

  useVehicle(v1);
  useVehicle(v2);

  // discryminating union
  interface Bird {
    type: "bird";
    flyingSpeed: number;
  }
  interface Horse {
    type: "horse";
    runningSpeed: number;
  }
  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
      case "bird":
        speed = animal.flyingSpeed;
        break;
      case "horse":
        speed = animal.runningSpeed;
        break;
    }
    console.log(`moving with speed: ${speed}`);
  }

  moveAnimal({ type: "bird", flyingSpeed: 22 });

  const paragraph = document.querySelector("#message-output");

  // type casting
  // const input = <HTMLInputElement> document.querySelector("#user-input");
  const input = document.querySelector("#user-input") as HTMLInputElement;
  input.value = "hello there";

  interface ErrorContainer {
    // email: "Not a valid email";
    [prop: string]: string;
  }
  const errorBag: ErrorContainer = {
    email: "Not a valid email",
  };

  const fetchedUserData = {
    id: 1,
    name: 'cl',
    job: {title: 'CEO', description: 'I own you'}
  }
  // optional chaining operator
  console.log(fetchedUserData?.job?.title);

  // nullish coalescing
  const userInput = null;
  // checks for null or undefined only 
  const storedData = userInput ?? 'DEFAULT';

};

export default advancedTypes;
