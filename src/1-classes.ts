const classes = () => {
  abstract class Department {
    // private id: string;
    // private name: string;
    protected employees: string[] = [];
    // private is only accessible from inside the class
    // protected is private + inheritants have access
    // static access without instantiation
    // readonly marks that it should not be changed. like const

    constructor(protected readonly id: string, public name: string) {
      // shorthand declaratiuon in constructor. nust have attrib
      // this.id = id;
      // this.name = n;
    }

    static createEmployee(name: string) {
      return { name };
    }

    abstract describe(this: Department): void;
    addEmployee(employee: string) {
      this.employees.push(employee);
    }
    printEmployeeInfo() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
      super(id, "IT");
    }
    describe() {
      console.log(`Department ${this.id}: ${this.name}`);
    }
  }
  class AccDepartment extends Department {
    // singleton - privat constructor
    private lastReport: string;
    private static instance: AccDepartment;

    get mostRecentReport() {
      if (this.lastReport) {
        return this.lastReport;
      } else throw new Error("no reports");
    }

    set mostRecentReport(value: string) {
      if (!value) {
        throw new Error("please pass in a valid value");
      }
      this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
      super(id, "IT");
      this.lastReport = reports[0];
    }

    static getInstance() {
      if (AccDepartment.instance) {
        return this.instance;
      }
      this.instance = new AccDepartment("id3", []);
      return this.instance;
    }

    describe() {
      console.log(`Department ${this.id}: ${this.name}`);
    }
    addEmployee(name: string) {
      if (name === "Max") return;
      this.employees.push(name);
    }

    addReport(text: string) {
      this.reports.push(text);
      this.lastReport = text;
    }
    getReports() {
      console.log(this.reports);
    }
  }

  // statics are accessible without instantiating and are not available on instances with this, only with class name dot
  const employee1 = Department.createEmployee("Sab");
  console.log(employee1);

  const acc = AccDepartment.getInstance();
  // all are the same
  const acc2 = AccDepartment.getInstance();
  const acc3 = AccDepartment.getInstance();
  // const acc = new AccDepartment("acc", ["weird"]);
  acc.mostRecentReport = "another one";
  acc.addReport("very");
  acc.getReports();

  const it = new ITDepartment("d3", ["Cl"]);
  it.describe();

  const accounting = new ITDepartment("2", []);
  console.log(accounting);

  // accounting.employees[4] = "Anna"; // stop dis garbagees

  accounting.addEmployee("Max");
  accounting.addEmployee("Cl");
  accounting.printEmployeeInfo();

  accounting.describe();

  // const accCopy = { name: "dummy", describe: accounting.describe };
  // accCopy.describe(); // errors
};

export default classes;
