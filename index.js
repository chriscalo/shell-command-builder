const execa = require("execa");
const PrettyError = require("pretty-error");

// A class for building up a shell command string. Uses a fluent interface for
// quickly building up a string with conditional arguments
// 
// const watch = true;
// const command = new CommandBuilder("ava", [ "--verbose"])
//   .arg("--watch", watch)
//   .toString(); // returns `ava --verbose --watch`
class CommandBuilder {
  constructor(command, args = []) {
    this.command = command;
    this.args = [...args];
    return this;
  }
  
  // Adds an argument to the list of arguments. Optionally, pass a truthy/falsy
  // value for `condition` to conditionally add the argument. Example:
  // 
  // const watch = false;
  // const command = new CommandBuilder("ava", [ "--verbose" ]);
  // command.arg("--watch", watch); // argument won't be added
  arg(value, condition = true) {
    if (Boolean(condition)) {
      // FIXME: escape or quote value if necessary
      this.args.push(value);
    }
    return this;
  }
  
  // Returns a string representation of the shell command ready to execute
  toString() {
    const { command, args } = this;
    return `${command} ${args.join(" ")}`;
  }
  
  // Execute current command and asynchronously return output
  async run(options = {}) {
    const command = this.toString();
    return exec(command, options);
  }
}

async function exec(command, options = {}) {
  command = String(command);
  return execa.command(command, {
    shell: true,
    stdio: "inherit",
    preferLocal: true,
    ...options,
  }).catch(error => {
    console.log(prettyError(error));
  });
}

exports.CommandBuilder = CommandBuilder;
exports.exec = exec;

function prettyError(error) {
  return new PrettyError().render(error);
}
