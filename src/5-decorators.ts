const decorators = () => {
  // a decorator is a function applied to a class
  // they start with uppercase
  // decorators execute when the class is defined not when it's instanciated

  function LoggerFactory(logString: string) {
    return function(constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }

  function WithTemplate(template: string, hookId: string) {
    return function actualDecorator<
      T extends { new (...args: any[]): { name: string } }
    >(originalConstructor: T) {
      return class extends originalConstructor {
        // now renders on instantiacion
        constructor(...args: any[]) {
          super();
          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = this.name;
          }
        }
      };
    };
  }

  // factory functions run in order
  // decorator functions execute bottom up
  @LoggerFactory("person log ")
  @WithTemplate("<h1>my person object</h1>", "app")
  class Person {
    name = "Claudiu";
    constructor() {
      console.log("creating person...");
    }
  }

  // withtemplate executes on instanciation
  const pers = new Person();
  // console.log(pers);

  // executes when the property is defined
  // 2 arguments for property
  function Log(target: any, propertyName: string | Symbol) {
    console.log("Prop decorator");
    console.log(target, propertyName);
  }

  // 3 arguments for accessor
  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }

  // method decorator - 3 args
  function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }

  // parameter decorator
  function Log4(target: any, name: string, position: number) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
  }

  class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else throw new Error("invalid price");
    }

    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
      return this._price * tax;
    }
  }

  function Autobind(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const ajustedDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      // extra wortk before we  execute the function
      // getter is like having a value property
      get() {
        // this will reffer to the object on which we originally defined the method
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return ajustedDescriptor;
  }

  class Printer {
    message = "works";

    @Autobind
    showMessage() {
      console.log(this.message);
    }
  }

  const p = new Printer();
  const button = document.querySelector("button")!;
  // this will reffer to the target of the event. could use bind
  // button.addEventListener("click", p.showMessage); .bind(p)
  button.addEventListener("click", p.showMessage);

  interface ValidatorConfig {
    [property: string]: {
      [validatableProp: string]: string[]; // required, positive ...
    };
  }

  const registeredValidators: ValidatorConfig = {};

  function Required(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
      [propertyName]: ["required"],
    };
  }
  function PositibeNumber(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
      [propertyName]: ["positive"],
    };
  }

  function validate(obj: any) {
    const objConfig = registeredValidators[obj.constructor.name];
    console.log(objConfig);
    if (!objConfig) return true;
    for (const prop in objConfig) {
      for (const validator of objConfig[prop]) {
        switch (validator) {
          case "required":
            return !!obj[prop];
          case "positive":
            return obj[prop] > 0;
        }
      }
    }
    return true;
  }

  class Course {
    @Required
    title: string;
    @PositibeNumber
    price: number;
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  const form = document.querySelector("form")!;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
      alert("invalid");
    }
    // console.log(createdCourse);
  });
};

export default decorators;
