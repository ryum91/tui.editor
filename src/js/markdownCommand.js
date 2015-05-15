/**
 * @fileoverview Implments MarkdownCommand
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var Command = require('./command');

var CodeMirror = window.CodeMirror;

var util = ne.util;

/**
 * MarkdownCommand
 * It implements Markdown Command
 * @exports MarkdownCommand
 * @augments Command
 * @constructor
 * @class
 * @param {string} name Command Name
 */
function MarkdownCommand(name) {
    Command.call(this, name, Command.TYPE.MD);
}

MarkdownCommand.prototype = util.extend(
    {},
    Command.prototype
);

/**
 * setup
 * Set current base and codemirror context
 * @param {CodeMirror} cm codemirror
 */
MarkdownCommand.prototype.setup = function(cm) {
    this.cm = cm;
    this.doc = cm.getDoc();
    this.base = cm.__ned;
};

/**
 * getCurrentRange
 * returns current selection's range
 * @return {object} selection range
 */
MarkdownCommand.prototype.getCurrentRange = function() {
    var from = this.cm.getCursor(true),
    to = this.cm.getCursor(false);

    return {
        from: from,
        to: to,
        collapsed: from === to
    };
};

/**
 * isAvailable
 * returns whether current codemirror is available for edit
 * @return {boolean} result
 */
MarkdownCommand.prototype.isAvailable = function() {
    return !this.cm.getOption('disableInput');
};

/**
 * getPass
 * return CodeMirror.Pass
 * @return {*} CodeMirror.Pass
 */
MarkdownCommand.prototype.getPass = function() {
    return CodeMirror.Pass;
};

MarkdownCommand.factory = function(props) {
    var mc = new MarkdownCommand(props.name);

    util.extend(mc, props);

    return mc;
};

module.exports = MarkdownCommand;
