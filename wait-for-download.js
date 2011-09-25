// WaitForDownload JavaScript library v1.0
// (c) Roman Gomolko - rgomolko@gmail.com
// License: MIT (http://www.opensource.org/licenses/mit-license.php)


(function (window, undefined) {
    var loadDefaults = function (target, defaults) {
        for (var key in defaults) {
            // If not defined in target - use default value
            if (target[key] === undefined) {
                target[key] = defaults[key];
                continue;
            }
            // Load defaults for nested properties
            if (typeof (defaults[key]) === 'object') {
                if (typeof (target[key]) !== 'object') {
                    // Only first property is specified. Don't need here - just create new object
                    target = {};
                }
                loadDefaults(target[key], defaults[key]);
            }
        }
    };
    var attachEvent = function (element, eventName, fn) {
        var eventNameWithOn = 'on' + eventName;
        if (typeof element.addEventListener != 'undefined') {
            element.addEventListener(eventName, fn, false);
        }
        else if (typeof element.document != 'undefined' && typeof element.document.addEventListener != 'undefined') {
            element.document.addEventListener(eventName, fn, false);
        }
        else if (typeof element.attachEvent != 'undefined') {
            element.attachEvent(eventNameWithOn, fn);
        }
        else {
            if (typeof element[eventNameWithOn] == 'function') {
                var existing = element[eventNameWithOn];
                element[eventNameWithOn] = function () {
                    existing();
                    fn();
                };
            }
            else {
                //setup function
                element[eventNameWithOn] = fn;
            }
        }
    };

    var createWindow = function (options) {
        var windowName = 'dl' + (1000 * Math.random()).toFixed();

        var width = options.window.width;
        var height = options.window.height;
        var left = (screen.availWidth - width) / 2;
        var top = (screen.availHeight - height) / 2;
        var w = window.open('about:blank', windowName, 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);
        var doc = w.document;
        doc.open();
        doc.write('<html><head><title>' + options.text.title + '</title></head>');
        doc.write('<body style="' + options.css.body + '">');
        doc.write('<span style="' + options.css.text + '">' + options.text.wait + '</span>');
        doc.write('<span id="dots"></span>');
        doc.write('<br /><a href="javascript:window.close()" style="' + options.css.close  + '">Close when done</a>');
        doc.write('</body></html>');
        doc.close();
        (function animateDots() {
            if (!doc) {
                return;
            }
            var dots = doc.getElementById('dots');
            if (!dots) {
                return;
            }

            if (dots.innerHTML.length >= 5) {
                dots.innerHTML = '';
            } else {
                dots.innerHTML += '.';
            }
            setTimeout(animateDots, 500);
        })();

        return windowName;
    };

    var defaultOptions = {
        text: {
            title: 'Download',
            wait: 'Please wait for download starting',
            close: 'Close when done'
        },
        css: {
            body: 'padding: 40px 20px; background-color: #E5E5E5; color: #00002E;',
            text: 'font-weight: bold;',
            close: 'color: #00318E; font-weight: normal;'
        },
        window: {
            height: 300,
            width: 400
        }
    };

    var downloader = function (targ, options) {
        if (options) {
            loadDefaults(options, defaultOptions);
        } else {
            options = defaultOptions;
        }

        var eventName;
        switch (targ.tagName) {
            case 'FORM':
                eventName = 'submit';
                break;
            case 'A':
                eventName = 'click';
                break;
            default:
                throw Error('WaitForDownload can not be attached to element ' + targ.tagName);
        }

        attachEvent(targ, eventName, function () {
            var winName = createWindow(options);
            targ.setAttribute('target', winName);
        });
    };

    var loadOptionsFromNode = function (node, prefix, result, defaults) {
        for (var key in defaults) {
            var attrName = prefix + '-' + key;
            if (typeof (defaults[key]) === 'object') {
                result[key] = {};
                loadOptionsFromNode(node, attrName, result[key], defaults[key]);
            } else {
                var value = node.getAttribute(attrName);
                if (value) {
                    result[key] = value;
                }
            }
        }
    };

    var defaultPrefix = 'data-wfd';
    var parseNode = function (node, prefix) {
        if (node.getAttribute(prefix) === undefined) {
            return;
        }
        var options = {};
        loadOptionsFromNode(node, prefix, options, defaultOptions);
        downloader(node, options);
    };

    downloader.init = function (prefix) {
        prefix = prefix || defaultPrefix;
        var links = document.getElementsByTagName('a');
        var i;
        for (i = 0; i < links.length; i++) {
            parseNode(links[i], prefix);
        }

        var forms = document.getElementsByTagName('form');
        for (i = 0; i < forms.length; i++) {
            parseNode(forms[i], prefix);
        }
    };
    
    downloader.defaultOptions = defaultOptions;
    downloader.prefix = defaultPrefix;
    window.WaitForDownload = downloader;
    attachEvent(window, 'load', function () { downloader.init(defaultPrefix); });
})(window);