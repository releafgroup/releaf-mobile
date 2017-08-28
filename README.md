# Releaf Mobile


  
## Features
  * [TypeScript](http://www.typescriptlang.org/)
  * [RxJS](https://github.com/Reactive-Extensions/RxJS)
  * [Webpack](http://webpack.github.io/)
  * [Yarn](https://github.com/yarnpkg/yarn) for fast, reliable, and secure dependency management.
  * [BetterScripts](https://github.com/benoror/better-npm-run) for better NPM scripts.
  * [tslint](https://github.com/palantir/tslint)
  * [Codelyzer](https://github.com/mgechev/codelyzer)
  * [Typedoc](https://github.com/TypeStrong/typedoc)
  * [NVM](https://github.com/creationix/nvm) to manage multiple active node.js versions

## Install
  **Make sure you have Node version >= 6.X and NPM >= 3** (node.js version used 7.5.0 and NPM v. 4.1.2)
  
  ```bash
  # Clone the repo
  $ git clone repo
  -----
  # change directory to our repo
  cd releafmobile
  -----
  # install the repo with yarn
  yarn
  -----
  # restore plugins and platforms
  cordova prepare
  -----
  # start the server (webpack-dev-server)
  npm run dev
  ```
  
  go to [http://0.0.0.0:8100](http://0.0.0.0:8100) or [http://localhost:8100](http://localhost:8100) in your browser
  
## Commands
  ```bash
  $ npm run dev             --> Run ionic serve ( development )
  $ npm run build           --> build files inside www folder ( production )
  $ npm run test            --> run test with Karma
  $ npm run ios:dev         --> start ios simulator (ionic run ios)
  $ npm run ios:release     --> build files for ios platform and generate xcodeproj (ionic build ios)
  $ npm run android:dev     --> start android simulator (ionic run android)
  $ npm run android:release --> build files for android platform and generate apk (ionic build android)
  ```
