# Frontend-starter

## What's included
Basic frontend starter pack:

- ES6 javascript
- SASS styling
- Mustache html
- Include all small `png` and `gif` as `data:..base64` url
- Copy all large images and hash their name
- Combination of all components' styling into single css
- Combination of all javascript into single file and automatically chunk this file where necessary
- A "production mode" which will:
  - minify all js and css
  - optimize svg

## What's not included
Hashing file names to force-invalidate server cache.

## Usage
### Structure

```
├── build                      # this is where your compiled files will end up
├── modules
│   ├── ORGANIZATIONNAME       # this where you put modules that you share across projects but are not published on NPM
│   │   └── checkbox           # sample component
│   │       ├── checkbox.html  # sample component template
│   │       ├── checkbox.scss  # sample component styling; imports project styleguide
│   │       ├── index.js       # sample component behaviour
│   │       └── tick.svg       # sample component asset
│   │  
│   └── PROJECTNAME            # this is where you put project-specific logic
│       ├── index.js           # file that takes care of cross-browser polyfills and other workarounds
│       ├── .modernizrrc       # modernizer confgi for which detects and features you need
│       ├── modules.js         # registration of all modules
│       └── styleguide.scss    # project variables (like colors), mixins (like animation) and abstract classes that components share
├── package.json
├── README.md
└── webpack.config.js
```

### Getting started
Search and replace `PROJECTNAME` in files and filenames.
Search and replace `ORGANIZATIONNAME` in files and filenames.
Run `webpack --watch` for initial compile and then auto-compiles on file changes.

### For production
Before running `webpack` set environment variable:

```sh
export PRODUCTION=1 # or `set -x PRODUCTION 1` for fish shell
```

Then run `webpack`. This optimizes svgs and minifies files. To go back to non-production mode:

```sh
export PRODUCTION # or `set -x PRODUCTION` for fish shell
```