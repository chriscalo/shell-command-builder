const test = require("ava");
const { CommandBuilder, exec } = require("./index.js");

test("exports CommandBuilder class and exec() function", (t) => {
  t.truthy(isClass(CommandBuilder));
  t.is(typeof exec, "function");
});

test("builds command with args", (t) => {
  const command = new CommandBuilder("foo", [
    "file.text",
    "--flag-1",
    "--flag-2",
    "-a",
  ]);
  t.is(String(command), "foo file.text --flag-1 --flag-2 -a");
});

test("adds flag with arg() method", (t) => {
  const command = new CommandBuilder("foo");
  command.arg("--hello");
  t.is(String(command), "foo --hello");
});

test("arg() adds flag only when provided condition is truthy", (t) => {
  const watch = true;
  const quiet = false;
  const command = new CommandBuilder("foo");
  command.arg("--watch", watch);
  command.arg("--quiet", quiet);
  t.is(String(command), "foo --watch");
});

test("runs command", async (t) => {
  const command = new CommandBuilder("echo 'hello, world!'");
  const { stdout } = await command.run();
  t.is(stdout, "hello, world!");
});

// https://zaiste.net/posts/javascript-class-function/
function isClass(value) {
  return (
    typeof value === "function" &&
    /^class\s/.test(Function.prototype.toString.call(value))
  );
}