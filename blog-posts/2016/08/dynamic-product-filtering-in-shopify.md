# Dynamic Product Filtering in Shopify

| Metadata name | Value                                |
| ------------- | ------------------------------------ |
| post_title    | Dynamic Product Filtering in Shopify |
| post_date     | 2016-08-11 00:37:34                  |
| post_modified | 2016-08-11 00:37:34                  |
| post_status   | publish                              |
| post_type     | post                                 |
| post_author   | Luke Boyle                           |

Disclaimer: Shopify is not good. I recommend steering clear and opting for one of many alternatives. It's an extremely closed platform that doesn't encourage innovation and naturally leans towards bad practice. Given this, if you still have to use it, read on.

In Shopify, there is a native (albeit 'unsupported') filtering system. Native Filtering is based on the tags you specify on your product. If you go to your collection, you can link the user to a tag and Shopify can filter product with simple Javascript like so; collections/collection-name/tag-one/tag-two. Now given that in a collection you have access to collection.all_vendors and all_types, WHY OH WHY, is there not native filtering based on that. Filtering could EASILY be dynamic if Shopify cared enough to implement that. The 'official' solution (as per the documentation; [https://help.shopify.com/themes/customization/collections/filtering-a-collection-with-multiple-tag-drop-down](https://help.shopify.com/themes/customization/collections/filtering-a-collection-with-multiple-tag-drop-down)) is to make several drop downs and set tags to be a list of tags you want to allow filtering by (e.g. tags = "red", "blue", "green"). So next week when I add a yellow shirt I have to go back into the pits and add another tag? Not happening. This is how I make filters dynamic. After searching for hours, I can conclusively say that there is no open source solution for this, and given the constraints of the garbage liquid templating engine, I can confidently say that this is the least convoluted solution available. All it takes is implementing a rigid structure in your tagging system, so this is much easier on a new store. The tag structure is basically as such: category:tagName. Let's say you want to filter your products by brand. In your product page, on the tags section, enter brand:brandName. Same goes for `size:1` or `color:blue`. It's up to you how many you use, because I guarantee your collection sorting template is going to be a BIG file. The best part about all this is that there's no array filter or equivalent method in liquid, so we're going to have to do some crazy shit.

```
{% for tag in collection.all_tags %} <-- Start iterating over all tags
  {% if tag contains 'style' %} <-- Check if it contains your keyword
    {% capture raw\_style\_tags %} <-- Initialise the variable \`raw\_style\_tags\`
      {{ raw\_style\_tags | append : tag | append: ', ' }} <-- Build a string of tags separated by commas
    {% endcapture %}
    {% assign style\_tags = raw\_style_tags | split: ', ' %} <-- Split the strings on the commas to build a new array
  {% endif %}
{% endfor %}
```

The variable `style_tags` is now an array of all tags including 'style:'. Now, you will make a select field where the options are all of your style tags. Note that current_tags returns a list of the tags you are currently filtering by.

```
 Shop by style
  All
      {% for t in style_tags %}
        {% assign tag = t | strip %}
    {% if current_tags contains tag %} <-- check if the tag is currently active - applies selected attribute
      {{ tag | remove: 'style:' }}
    {% elsif product_tags contains tag %} <-- else, just make it an option
      {{ tag | remove: 'style:' }} <\-\- use the remove filter to have just the tag name
    {% endif %}
      {% endfor %}
```

If you include the Javascript from the Shopify docs, it will automatically
listen for changes to that .coll-filter. This way, if you ever add any more
tags under the `style:` category, you won't have to update your view. And the
best part is, you can just add a new category in your product page, copy paste
those lines of code and change 'style' to whatever your new category is called.
I must reiterate, you should only use Shopify if you have no other choice. Cheers!
