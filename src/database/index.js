import { AsyncDatabase } from "promised-sqlite3";
import tableColumns from "./employee.js";

async function openDatabase() {
  const db = await AsyncDatabase.open("./database.sqlite");
  console.log("Connected to database");
  return db;
}

async function closeDatabase(db) {
  await db.close();
  console.log("Closed database connection");
}

(async () => {
  try {
    const db = await openDatabase();

    const query = `CREATE TABLE IF NOT EXISTS employees(${tableColumns})`;
    await db.run(query);
    console.log("created employees table");

    await closeDatabase(db);
  } catch (error) {
    console.log(error.message);
  }
})();

async function getEmployees() {
  console.log("Fetching employees");
  try {
    const db = await openDatabase();

    const query = "SELECT * FROM employees";
    const employees = await db.all(query);
    console.log(employees);

    await closeDatabase(db);

    return employees;
  } catch (error) {
    console.log(error.message);
  }
}

async function insertEmployees(employees) {
  console.log("inserting employees");

  try {
    const employeeValues = employees.map((employee) => {
      console.log(employee);
      return {
        $surname: employee.surname,
        $initials: employee.initials,
        $department: employee.department,
        $clockNumber: employee.clockNumber,
        $overheadCrane: employee.overheadCrane
          ? `${new Date(employee.overheadCrane)}`
          : null,
        $forklift: employee.forklift ? `${new Date(employee.forklift)}` : null,
        $tractor: employee.tractor ? `${new Date(employee.tractor)}` : null,
        $firstAid: employee.firstAid ? `${new Date(employee.firstAid)}` : null,
        $workingHeights: employee.workingHeights
          ? `${new Date(employee.workingHeights)}`
          : null,
        $fire: employee.fire ? `${new Date(employee.fire)}` : null,
        $siteRep: employee.siteRep ? `${new Date(employee.siteRep)}` : null,
        $mobileCrane: employee.mobile ? `${new Date(employee.mobile)}` : null,
      };
    });

    const db = await openDatabase();

    const query = `INSERT INTO 
      employees(surname, initials, department, clockNumber, overheadCrane, forklift, tractor, firstAid, workingHeights, fire, siteRep, mobileCrane) 
      VALUES ($surname, $initials, $department, $clockNumber, $overheadCrane, $forklift, $tractor, $firstAid, $workingHeights, $fire, $siteRep, $mobileCrane)`;

    const employeeInserts = employeeValues.map((employee) => {
      console.log(employee);
      return db.run(query, employee);
    });
    await Promise.all(employeeInserts);
    console.log("inserted employees");

    await closeDatabase(db);

    return employees;
  } catch (error) {
    console.log(error.message);
  }
}

async function clearDatabase() {
  console.log("clearing database");

  try {
    const db = await openDatabase();

    const query = "DELETE FROM employees";
    await db.run(query);

    console.log("cleared database");

    await closeDatabase(db);
  } catch (error) {
    console.log(error.message);
  }
}

export { getEmployees, insertEmployees, clearDatabase };
