//@ts-check
const fs = require('fs')
const { join } = require('path')

const move = [
  './types/',
  './src',
  './dist',
  './tsconfig.json',
  './clean.to.be.deleted.js',
]

if (!fs.existsSync('./backup')) {
  fs.mkdirSync('./backup')
}

let tsConfig = {}
eval(`tsConfig = ${fs.readFileSync('./tsconfig.json').toString()}`)
delete tsConfig.compilerOptions.paths['@DTO/*']

move.forEach(file => {
  if (fs.existsSync(file)) {
    fs.renameSync(file, join('./backup', file))
  }
})

fs.writeFileSync('./tsconfig.json', JSON.stringify(tsConfig, null, 2))

fs.mkdirSync('src')
fs.mkdirSync('types')
fs.writeFileSync('./src/index.ts', `// root file for your project`)
fs.writeFileSync(
  './types/global.d.ts',
  `//
// root file for your types you can make declarations here
// declare const PRODUCTION: string`,
)
const package = JSON.parse(fs.readFileSync('./package.json').toString())
package.version = '0.0.1'
package.name = 'my-ts-lib'
package.private = true
package.author = { name: 'me', email: 'may@ema.l' }

delete package.scripts['clean:template']

fs.writeFileSync('./package.json', JSON.stringify(package, null, 2))
// fs.unlinkSync('./git')
