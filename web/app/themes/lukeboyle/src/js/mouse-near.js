import throttle from 'lodash/throttle';

/**
 *
 * @param {HTMLElement | string} target - HTMLElement or querySelector string
 * @param callback
 * @param options
 */
export default function(target, callback, options = {}) {
    const element = parseElement(target);
    const elementRect = element.getBoundingClientRect();
    const elementBounds = calculateElementBounds(elementRect, options);
    const eventCallback = throttle(function(event) {
        if (isMouseInRange(event, elementBounds)) {
            callback();
            if (!options.persistent) {
                document.removeEventListener('mousemove', eventCallback);
            }
        }
    }, 100);
    document.addEventListener('mousemove', eventCallback);
}

function calculateElementBounds(elementRect, options) {
    const buffer = options.buffer || 0;
    if (isNaN(buffer)) {
        throw new TypeError('options.buffer was expecting a number, was given: ' + typeof options.buffer);
    } else {
        return {
            top: elementRect.top - buffer,
            bottom: elementRect.bottom + buffer,
            left: elementRect.left - buffer,
            right: elementRect.right + buffer
        }
    }
}

/**
 * @param {Event} event
 * @param {Object} elementBounds
 */
function isMouseInRange(event, elementBounds) {
    return event.clientX <= elementBounds.right
        && event.clientX >= elementBounds.left
        && event.clientY <= elementBounds.bottom
        && event.clientY >= elementBounds.top;
}

function parseElement(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    } if (selector instanceof HTMLElement) {
        return selector;
    } else {
        throw new TypeError('prefetch was expecting a querySelector string or a HTML Element');
    }
}