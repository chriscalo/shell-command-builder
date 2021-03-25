# shell-command-builder
Construct and execute shell commands

Build shell commands with arguments:

``` js
const command = new CommandBuilder("foo", [
  "file.text",
  "--flag-1",
  "--flag-2",
  "-a",
]); //=> foo file.text --flag-1 --flag-2 -a
```

Convert command to a string:

``` js
String(command);
command.toString();
`command = ${command}`;
```

Use fluent API to add args/flags after initial command is created:

``` js
const command = new CommandBuilder("foo");
command.arg("--hello");
console.log(command); //=> foo --hello
```

Pass in a truthy/falsy condition to optionally add args/flags:

``` js
const command = new CommandBuilder("foo");
command.arg("--watch", true); // added
command.arg("--quiet", false); // not added
console.log(command); //=> foo --watch
```

Run commands:

``` js
const command = new CommandBuilder("echo 'hello, world!'");
const { stdout } = await command.run(); //=> hello, world!
```
