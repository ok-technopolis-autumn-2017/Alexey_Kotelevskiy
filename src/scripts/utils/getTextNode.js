/**
 * @param {HTMLElement} node
 * @return {Node}
 */
function getTextNode(node) {
    var childs = node.childNodes;
    var i = 0;
    var l = childs.length;

    for (; i !== l; i += 1) {
        if (childs[i].nodeName === '#text') {
            return childs[i];
        }
    }

    var result = document.createTextNode('');
    node.appendChild(result);
    return result;
}

module.exports = getTextNode;