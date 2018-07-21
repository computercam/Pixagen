# pixagen

> Digital Image Exploration Utility

[Live Demo](https://pixagen.app)

## Todo / Possible Features:
UI bug fixes for mobile
Better handling of failures when loading new images, maybe fallback to regeneration
Improve keyword generation through better categories and keywords
* Add more categories and keywords
* Prune consistently useless keywords
* More predictably relevent keywords
* Stucture generation in various formats (ajective noun)
Allow for user to manually input keywords to mix in with generation
* User can create their own categories and add keywords to it
Add keyword translation feature for generation
Improve code quality and modularity of scraper API
Add API support for other image indexes such as tumblr, behance and pinterest
Users can like keywords and categories to increase probability of usage
User can add likes to folders to organize their likes
User can mass download likes as zip format
User can clear and save storage history / likes / settings text format.
User login and storage via database

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
