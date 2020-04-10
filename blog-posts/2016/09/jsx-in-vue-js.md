# JSX in Vue.JS

| Metadata name | Value               |
| ------------- | ------------------- |
| post_title    | JSX in Vue.JS       |
| post_date     | 2016-09-25 12:10:58 |
| post_modified | 2016-09-25 12:10:58 |
| post_status   | inherit             |
| post_type     | revision            |

I've recently been experimenting with using jsx in Vue, the Vue jsx plugin for babel and using that instead of the standard template pattern. Since there are really not any official docs for the plugin, I'm going to run through a quick usage guide.

### Getting Started

For my project I'm using Webpack and just default npm scripts. Whatever your choice for build process the important part is what you have configured your babel config or .babelrc with.

    plugins: [
        'transform-runtime',
        'transform-vue-jsx'
    ],
    presets: ['es2015']

That's the basic requirement for getting started. To install those, run:

-   `npm install -D babel-plugin-transform-runtime`
-   `npm install -D babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx`
-   `npm install -D babel-preset-es2015`

The official repo for the Vue jsx is located here: [https://github.com/vuejs/babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) The interesting part about VueJsx in my opinion is that it follows the Angular pattern for registering components. Whereas in React you just import a function that returns jsx and you can name it whatever, in Vue jsx you must declare the name and register the component globally. Vue has a component method that takes a name and an object with all relevant data. The difference being is that instead of a `template` entry, there's a `render` function which returns jsx.

    Vue.component('jsx-example', {
      render (h) { // <-- h must be in scope
        return <div id="foo">bar</div>
      }
    })

    // Usage

    <div>
        <jsx-example/>
    </div>

`h` is the shorthand for the Vue instance \$createElement method so you have to make sure that h is in the scope of your components, like so:

    const pageView = new Vue({
        el: '#root',
        data: {},
        methods: {},
        render () {
            const h = this.$createElement;
            return (
                <div>
                    <jsx-example/>
                </div>
            )
        }
    });

From the get go it seems to me like we've lost some of the versatility that jsx provides by having to integrate it into the normal Vue component pattern.

      return (
        <div
          // event listeners are prefixed with on- or nativeOn-
          on-click={this.clickHandler}
          nativeOn-click={this.nativeClickHandler}
          key="key"
          ref="ref">
        </div>

### Considerations

There's a strange thing where on-change on a form input seems to be naturally debounced, and the `nativeOn-change` doesn't seem to be any different. The behaviour doesn't seem to be the same as the React class where you can refer to an element with `this.refs`, you need to use `this.$refs` which follows the usual Vue convention. Since there's no documentation surrounding the jsx, I'm assuming the rest of the behaviour follows the standard Vue component pattern, but instead of a template, there's a `render` function. The jsx doesn't support the normal vue directives so you'll have to do any of those things programmatically.
