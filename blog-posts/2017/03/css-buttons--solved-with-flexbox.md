---
post_title: CSS Buttons: Solved with Flexbox
post_date: 2017-03-09 03:57:17
post_modified: 2017-03-09 03:57:17
post_status: publish
post_type: post
post_author: Luke Boyle
---

There are two commonly accepted approaches to making buttons with CSS, but both of them are a little bit shit. What if I told you there was another way? (`morpheus.wav`)

## Option 1: Padding for vertical centering (Blue Pill)

```html
<style>
	.button-padding-approach {
		font-size: inherit;
		-webkit-appearance: none;
		border-radius: 0;
		border-style: solid;
		border-width: 0;
		cursor: pointer;
		font-weight: normal;
		line-height: normal;
		margin: 0;
		position: relative;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		padding: 1rem 2rem 1.0625rem 2rem;
		font-size: 16px;
		background-color: #999;
		color: #000;
		max-width: 170px;
	}
</style>

<div>[A Button](#) [A Button that breaks to two lines](#)</div>
```

This approach works okay, and it's good for multi-line (buttons where the marketing team sanctioned too much copy) text. The problem with typography, is that glyphs can have descenders (as in y and j) which push the bottom of the bounds down. So if you want to properly vertically center your text you have to baby the padding so much that it becomes too much of a pain in the ass. The padding on the above buttons is `padding: 1rem 2rem 1.0625rem 2rem;`. 5 significant figures for bottom padding? I don't think so.

## Option 2: Line Height for vertical centering (Red Pill)

```html
<style>
	.button-lineheight-approach {
		-webkit-appearance: none;
		border-radius: 0;
		border-style: solid;
		border-width: 0;
		cursor: pointer;
		font-weight: normal;
		line-height: normal;
		margin: 0;
		position: relative;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		background-color: #999;
		color: #000;
		max-width: 170px;
		height: 50px;
		line-height: 50px;
		padding: 0 2rem 0;
	}
</style>

<div>[A Button](#) [A Button that breaks to two lines](#)</div>
```

This approach is a lot less hands on for the vertical alignment. You set `height: 50px;` and `line-height: 50px;` and voila, perfect vertical alignment. Until you need two lines and then it bleeds out of the button because you thought a CTA would never be more than 3 words long. At this point you're forced to either increase the button width, or reduce your font-size and neither are very designer friendly.

## Option 3: Flexbox (dubbed by me as the green pill)

```html
<style>
	.button-flexbox-approach {
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-appearance: none;
		border-radius: 0;
		border-style: solid;
		border-width: 0;
		cursor: pointer;
		font-weight: normal;
		line-height: normal;
		margin: 0;
		position: relative;
		text-align: center;
		text-decoration: none;
		padding: 1rem 2rem 1.0625rem 2rem;
		font-size: 16px;
		background-color: #34495e;
		color: #fff;
	}
	.button-flexbox-approach:hover {
		color: #fff;
	}
	.flex-button-container {
		display: inline-block;
	}
</style>

<div>
	<div class="flex-button-container">[A Button](#)</div>

	<div class="flex-button-container" style="max-width: 170px;">
		[A Button that breaks to two lines](#)
	</div>
</div>
```

The main caveat of this approach is that the button now needs a container. The container doesn't need anything fancy on it, just `display: inline-block;` to allow the content to naturally scale, and if you want to restrict how large the button can be, add `max-width: x;` Other than that, this approach is pretty bullet-proof from my testing and I like it a lot.
