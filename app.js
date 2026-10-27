// Contains the main programme and employee operations.

const fs = require("fs");

// File name comes from .env (process.env), default is employees.json
const FILE = process.env.DATA_FILE || "employees.json";

// What you typed: "add Ravi Dev 50000" -> cmd = "add", args = ["Ravi","Dev","50000"]
const [cmd, ...args] = process.argv.slice(2);

// Read the file (or start with an empty list), and save it back
const load = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : []);
const save = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

const employees = load();

if (cmd === "add") {
  const [name, role, department, salary] = args;
  const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  employees.push({ id, name, role,department, salary: Number(salary) });
  save(employees);
  console.log("Added", name);
} else if (cmd === "list") {
  console.table(employees);
} else if (cmd === "search") {
  console.table(employees.filter((e) => JSON.stringify(e).toLowerCase().includes(args[0].toLowerCase())));
} else if (cmd === "delete") {
  save(employees.filter((e) => e.id !== Number(args[0])));
  console.log("Deleted ID", args[0]);
} else {
  console.log("Use: add <name> <role> <department> <salary> | list | search <word> | delete <id>");
}


// node --env-file=.env app.js add ... runs the JavaScript file directly.
// npm run add -- ... uses the shortcut you defined in package.json.

// npm run add -- Ravi Developer 50000
// npm run add -- Priya Designer 45000
// npm run list
// npm run search -- priya
// npm run delete -- 1




// npm start                                                  # shows help
// npm run add -- --name "Ravi" --role "Developer" --department "IT" --salary 50000
// npm run add -- --name "Priya" --role "Designer" --salary 45000
// npm run list
// npm run search -- priya
// npm run update -- 1 --role "Team Lead" --salary 70000
// npm run delete -- 2

// npm run <command> -- <arguments>

// First --
// Separetes npm's options from the argument passed to your application 