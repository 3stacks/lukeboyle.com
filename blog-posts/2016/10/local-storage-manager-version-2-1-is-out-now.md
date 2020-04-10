# Local Storage Manager version 2.1 is out now

| Metadata name | Value                                        |
| ------------- | -------------------------------------------- |
| post_title    | Local Storage Manager version 2.1 is out now |
| post_date     | 2016-10-19 04:47:24                          |
| post_modified | 2016-10-19 04:47:24                          |
| post_status   | inherit                                      |
| post_type     | revision                                     |
| post_author   | Luke Boyle                                   |

The latest version of local-storage-manager has had the internal interface greatly improved for tidiness and best practice, and now has the new Namespace feature. Traditionally, you would have to store your data like so:

    const appState = {
        key1: {...},
        key2: {...}
    }

and set the data like this:

    localStorageManager.set('appData', appState);

The issue with this is you may not want `key1` and `key2` to be grouped together but don't want them to be tossed straight into the local storage. With namespaces you can do this:

    localStorageManager.set('key1', key1, 'myAppState');
    localStorageManager.set('key2', key2, 'myAppState');

This makes it easier to access all of your data at once while still keeping those keys theoretically separate. When accessing the namespaced data, you simply add the namespace as the second arg like so:

    localStorageManager.get('key1', 'myAppState');

The app is now more robust internally and can handle cases of missing data better. It also uses the `getItem` and `setItem` methods internally instead of accessing the localStorage directly. To get started, install via npm with `npm install @lukeboyle/local-storage-manager` See the npm page with documentation and in depth instructions at - https://www.npmjs.com/package/@lukeboyle/local-storage-manager
