import mouseNear from '@lukeboyle/mouse-near';

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
    return fillWithNodes(container, innerContent.querySelector('main').childNodes);
}

function revealContent() {
    setTimeout(function() {
        document.querySelector('.portfolio-pane').classList.add('shown')
    }, 100);
    setTimeout(function() {
        document.querySelector('.portfolio-pane').classList.add('free')
    }, 1600)
}

function handleReadMoreLink(markup, event) {
    if (event.target.getAttribute('data-portfolio-content-loaded')) {
        event.preventDefault();
        window.history.pushState(null, '', event.target.getAttribute('href'));
        document.querySelector('main').appendChild(markup);
        revealContent();
        const callback = function() {
            document.querySelector('.portfolio-pane').parentNode.removeChild(document.querySelector('.portfolio-pane'));
            window.removeEventListener('popstate', callback);
        };
        window.addEventListener('popstate', callback);
    }
}

function init() {
    const prefetchElements = Array.from(document.querySelectorAll('[data-prefetch]'));

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
}

window.addEventListener('load', init);

