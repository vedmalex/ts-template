# ts-template

template project for JS/TS developemts

jest with code coverage support

it uses WebPack 5 as far as it support ts-macro

it make treeshaking

expose types of generated files into separate directory

make possible to build different types of output files

Update to be used with [ts-macros](https://github.com/GoogleFeud/ts-macros)
see more info [ts-macro](https://googlefeud.github.io/ts-macros/index.html)

to start using run:

npm run clean:template
all demo files wil be moved to backup folder

compile parameters

--env targets=node,web,esm --mode=production --env noclean

available target

- node
- web
- esm

they can be extended in script
