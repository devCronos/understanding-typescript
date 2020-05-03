const interfaces = () => {
  interface AddFn {
    (a: number, b: number): number;
  }
  // type AddFn = (a:number, b:number) => number;
  // can implement interface as function type

  let add: AddFn;
  add = (n1: number, n2: number) => n1 + n2;

  // interface is clearer and refers to object types
  // are implementable = used as a contract a class has to adhere to
  // inforce a certain structure. what has to be in there
  interface Named {
    readonly name: string;
    // ro modifier = cant be changed after initialization
    // not available on types
    outputName?: string;
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }

  // can implement more interfaces
  class Person implements Greetable, Named {
    outputName = "optional!!";
    constructor(public name: string) {}
    greet() {}
  }

  let user1: Greetable;
  user1 = new Person("cl");
  // user1.name = "bam" // errors
};

export default interfaces;
