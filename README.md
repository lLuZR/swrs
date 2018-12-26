README
============
Simple utility to setup and switch between npm registries.

### Install
    npm install swrs -g

### Run program width
    swrs {command} {args}
    switch-registry {command} {args}

## Commands
* -v, --version(Display version number)
* -h(View the use help documentation)
* list, ls(Display list of registry that has been added)
* add [registry] (Add a new registry)
* init (Initializes the registry file)
* use(Change an existing registry)
* change(same as use)
* remove(Remove an existing registry)

### List all npm registries
    swrs ls