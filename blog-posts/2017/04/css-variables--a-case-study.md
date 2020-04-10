# CSS Variables: A Case Study

| Metadata name | Value                       |
| ------------- | --------------------------- |
| post_title    | CSS Variables: A Case Study |
| post_date     | 2017-04-26 15:50:11         |
| post_modified | 2017-04-26 15:50:11         |
| post_status   | inherit                     |
| post_type     | revision                    |

In [Agander](https://agander.io), I made my first forays into colour themes. In a very simple approach, I have two colour schemes (light and dark) which are displayed on the body as a class (scheme-light and scheme-dark) respectively. The general approach for styling a component is as such: `_button.scss`

    // Define base component styles (e.g. sizing/positioning)
    .button {
      border: 1px solid;
      padding: 6px 5px;
    }

    // Dark Color scheme styles
    .scheme-dark {
      .button {
        background: white;
        border-color: white;
        color: black;
      }
    }

    // Light Color scheme styles
    .scheme-light {
      .button {
        background: black;
        border-color: black;
        color: white;
      }
    }

Although this is quite lightweight, there are still issues.

1.  It puts a hard dependency on codebase changes to add, remove or modify themes,
2.  It makes user defined colour schemes all but impossible
3.  Simple component partials are no longer neat self-contained partials with one selector defining all the component styles
4.  There are several cases where I need to have colours that contradict the global colour scheme (e.g. black text for the white modal dialog) and it requires the use of !important and many colour overrides.
5.  The extensibility of the approach is very limited because as more themes are added, the stylesheets WILL get bloated and overweight.

Enter the CSS Variable (the hero we need) CSS Variables are defined like so:

    :root {
      // Initialise the variable
      --primary-color: pink
    }

    p {
      color: var(--primary-color); // it's pink, baby.
    }

The `var` function also takes a second argument which is an initial/fallback value.

    p {
      color: var(--primary-color, red);
    }

CSS Variables follow block scoping principles, so, variables defined in `:root` are considered to be global variables (but may be overwritten inside specific components) and variables defined in any other element are scoped to that block of styles. This is broken down very nicely on a recent [Smashing Magazine article](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/#scope-and-inheritance).

### How can CSS Vars help Agander?

I recently wrote a library to ingest variable names and values and spit them onto the root element (see [the package](https://www.npmjs.com/package/@lukeboyle/sync-vars)) The idea is that each theme would have all relevant variables defined in objects like so:

    const viewState = {
      currentTheme: 'darkScheme'
    }

    const themes = {
      darkSheme = {
        'primary-color': {
          hex: '#FFF'
        }
      },
      lightScheme: {
        'primary-color': {
          hex: '#000'
        }
      }
    }

And then when the currentTheme changes:

    import syncVars from '@lukeboyle/sync-vars';

    function updateCssVariablesWithCurrentScheme(colorScheme) {
      syncVars(themes[colorScheme]);
    }

    // if we call that function with 'darkScheme'
    updateCssVariablesWithCurrentScheme('darkScheme');

    <html style="--primary-color: #FFF;"></html>

So, how does this help? For one thing, with this approach, I no longer have to worry about adding the colour scheme classes to the body, and I don't have to do any hacky overrides, etc. `_buttons.scss` now looks like this:

    .button {
      border: 1px solid var(--text-color-var);
      padding: 6px 5px;
      background: var(--button-background-color-var);
      color: var(--text-color-var);
    }

Looking forward, this approach also means that custom colour themes are very nearly in reach. It also means that colour schemes could be changed on the fly. The user could have a colour swatch tool and be previewing their theme changes live. Taking it even further, it means that the colour schemes no longer need to be a part of the codebase. It could just as easily be a JSON file on the server and changes could be flexibly pushed. Why is this exciting? Say it's Christmas time and you want to get into the spirit of things... With a few string replacements you have a temporary festive theme to force upon your users.

### Other Applications

#### Accessibility

Sites or apps could have buttons to activate color blind mode and specific 'problem' colours could be swapped out for friendly colours. Additionally, high contrast modes would be a breeze.

#### Easter Eggs

Users could activate alternate modes for websites to get a different experience.

### Retrospective

CSS variables are getting me really excited because it's the first minimal overhead approach to theming in front-end only applications. This is something that will reward well structured stylesheets and result in a better experience for the user. I am looking forward to rolling out custom themes in Agander and finally getting around to making the flat UI theme I have wanted to make for some time.
