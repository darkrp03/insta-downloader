const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/app.ts'],
    platform: 'node',
    bundle: true,
    minify: true,
    outfile: 'dist/app.js'
}).catch(() => process.exit(1));