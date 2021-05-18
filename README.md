# shell-command-builder
Construct and execute shell commands

Install:
``` sh
yarn add shell-command-builder
# OR
npm install shell-command-builder
```

Require or import the module:

``` js
const { CommandBuilder, exec } = require("shell-command-builder");
// OR 
import { CommandBuilder, exec } from "shell-command-builder";
```

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
const options = {
  watch: true,
  quiet: false,
};
command.arg("--watch", options.watch); // added
command.arg("--quiet", options.quiet); // not added
console.log(command); //=> foo --watch
```

Run commands:

``` js
const command = new CommandBuilder("echo 'hello, world!'");
const { stdout } = await command.run(); //=> hello, world!
```
