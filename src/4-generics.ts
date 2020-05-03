const generics = () => {
  // const names: string[] = [] // same as
  const names: Array<string> = [];

  const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 1000);
  });
  promise.then((data) => data.split(" "));

  // generic type constraint
  function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }

  const merged = merge({ name: "banana" }, { age: 34 });
  // merged.age

  interface Lengthy {
    length: number;
  }

  function countAndDesc<T extends Lengthy>(element: T): [T, string] {
    let desc = "got no value";
    if (element.length > 0) {
      desc = `Got ${element.length} element${element.length > 1 ? "s" : ""}`;
    }
    return [element, desc];
  }
  console.log(countAndDesc(["hello there", "sports"]));

  function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
  ) {
    return obj[key];
  }

  console.log(extractAndConvert({ name: "hehe" }, "name"));

  // generic class
  class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
      this.data.push(item);
    }
    removeItem(item: T) {
      if (this.data.indexOf(item) !== -1) {
        this.data.splice(this.data.indexOf(item), 1);
      }
    }
    getItems() {
      return [...this.data];
    }
  }
  const textStorage = new DataStorage<string>();
  textStorage.addItem("a");
  textStorage.addItem("b");
  textStorage.addItem("c");
  textStorage.removeItem("c");
  console.log(textStorage.getItems());

  const numberStorage = new DataStorage<number>();
  numberStorage.addItem(2);

  // const objStorage = new DataStorage<object>();
  // objStorage.addItem({ name: "c" });
  // objStorage.addItem({ name: "d" });

  // objStorage.removeItem({ name: "c" });
  // console.log(objStorage.getItems());

  interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
  }

  function createCourseGoal(
    title: string,
    description: string,
    date: Date
  ): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
  }

  const namesarr: Readonly<string[]> = ["Cl", "A"];
  // namesarr.push('D');
};

export default generics;
