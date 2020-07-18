---
post_title: Using the new built in Wordpress RESTful API for front end
post_date: 2016-12-23 02:50:52
post_modified: 2016-12-23 02:50:52
post_status: draft
post_type: revision
post_author: Luke Boyle
---

On my portfolio page, there's a feature that will request whichever post you mouseover so that it opens that post in the current page (just to be flashy). I'm using the `fetch` API, but since I could only request the url of the post I got an entire HTML document and I had to work on that to get just the content. The current system grabs that HTML and then grabs all children nodes and inserts them in a new div one by one (see below):

    /**
     * @param {HTMLElement} target
     * @param {NodeList} nodes
     * @returns {HTMLElement}
     */
    function fillWithNodes(target, nodes) {
        const nodeArray = Array.from(nodes);
        nodeArray.forEach((node) => {
           target.appendChild(node);
        });
        return target;
    }

    function parseHtml(html, containerClass) {
        const container = document.createElement('div');
        const innerContent = document.createElement('div');
        innerContent.innerHTML = html;
        container.classList.add(containerClass);
        // Fill the container with all nodes under the main tag
        const nodes = innerContent.querySelector('main').childNodes
        return fillWithNodes(container, nodes);
    }

This action is initialised using the mouse-near package I wrote specifically for this purpose (see [here](https://www.npmjs.com/package/@lukeboyle/mouse-near)). The reason I didn't just use hoverintent is because it did not allow for a buffer radius around the element and I wanted to prefetch the page when the mouse started approaching it.

        prefetchElements.forEach((item) => {
            mouseNear(item, () => {
                window.fetch(item.getAttribute('data-prefetch'))
                    .then(
                        (response) => response.text()
                    ).then((text) => {
                    const markup = parseHtml(text, 'portfolio-pane');
                    item.querySelector('a').addEventListener('click', handleReadMoreLink.bind(this, markup));
                    item.removeAttribute('data-portfolio-item');
                    item.querySelector('a').setAttribute('data-portfolio-content-loaded', 'true');
                })
            }, { buffer: 80 })
        });

This is all a very convoluted way to just get some html on the page. If I was able to use the WP API, I would not have to:

-   fetch an entire document just to get some content
-   process and throw away half of the document

Resulting in a faster and easier interface.
