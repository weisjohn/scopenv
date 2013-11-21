scopenv
==========

### environment variables with any number of prefixes

scopenv allows you to pull in configuration values from your environment variables while specifying optional prefixes that should be honored. This is helpful when colocating a number of instances of generic apps that use similar variable names but need different values.

## usage

Given an environment (e.g. `~/.bashrc` or `~/.bash_profile`) like:

```bash
export HOST='localhost'
export DB_HOST='123.45.67.89'
export DB_PASS='password123'
export MYAPPNAME_DB_HOST="127.0.0.1"
```

You could retrieve your application's configuration by specifying the environment variables to retrieve and a number of prefixes to attempt to use.

```
var scopenv = require('scopenv');
console.log(scopenv(['host', 'pass'], 'db', 'myappname'))
```

Output

```
{ host: '127.0.0.1', pass: 'password123' }
```


This is especially helpful in development if you want to simply define a set of variables, but in staging or production, you want to configure each application separately.

If you didn't specify 'myappname', you'd get:

```
var scopenv = require('scopenv');
console.log(scopenv(['host', 'pass'], 'db'))
```

Output

```
{ host: '123.45.67.89', pass: 'password123' }
```



NOTE: scopenv can be invoked with any number of prefixes.