
+++
title = "I-Phone Scroll"
date = "2010-06-18"
author = " "
cover = ""
description = ""
category = ["programming","fun","iphone scroll","javascript","animation"]
+++

One of the amazing features of i-phone user interface is smooth panning/scrolling animation.

 I-phone “List Scrolling” perhaps gives a very funky and usable List –View to its users and allows them to scroll up and down the interface without any need of a scroll bar.

 This interface is sensitive to the push speed and also shows traces of resilience.

 I have been experimenting with various techniques to bring out similar effect using JavaScript and HTML, I am not quite sure if this would be useful in its present form but with some modifications may be this sample could prove its worthiness somewhere.

 [![iphone](http://www.varunpant.com/static/resources/iphone_thumb_1.png "iphone")](http://www.varunpant.com/static/resources/iphone_1.png)

 The code involved is also very little.

 ```
    var scroll = {
    down: false,
    verticalOffset: -5,
    ym: 0,
    decay: .93,
    mdDecay: 0.27,
    speedOffset: 0.4,
    sprinessOffset: 0.08,
    \_velocity: 0,
    \_mouseDownY: 0,
    $: function (id) {
        return document.getElementById(id);
    },
    /* --- events --- */
    addEvent: function (o, e, f) {
        if (window.addEventListener) o.addEventListener(e, f, false);
        else if (window.attachEvent) r = o.attachEvent('on' + e, f);
    },
    init: function () {
        setInterval(scroll.compositiontarget\_rendering, 30);

        scroll.verticalOffset = scroll.$('scrollMe').offsetTop;

        scroll.addEvent(scroll.$('scrollMe'), 'mousedown', function (e) {
            scroll.$('scrollMe').style.cursor = 'move';
            if (!scroll.down) {
                scroll.down = true;
                scroll.ym = e.clientY;
                scroll.\_mouseDownY = scroll.$('scrollMe').offsetTop;
            }

            if (e.preventDefault) e.preventDefault();
        });

        scroll.addEvent(scroll.$('scrollMe'), 'mouseup', function () {
            scroll.down = false;
            scroll.$('scrollMe').style.cursor = 'default';

        });


        scroll.addEvent(scroll.$('scrollMe'), 'mousemove', function (e) {
            if (scroll.down) {
                if (scroll.canScrollFurther()) scroll.$('scrollMe').style.top = (scroll.\_mouseDownY + (e.clientY - scroll.ym)) + 'px';
                // update the velocity
                scroll.\_velocity += ((e.clientY - scroll.ym) * scroll.speedOffset);
            }

        });

        document.onselectstart = function () {
            return false;
        }
    },
    compositiontarget\_rendering: function () {
        // decay the velocity
        if (scroll.down) {
            scroll.\_velocity *= scroll.mdDecay;
        } else {
            scroll.\_velocity *= scroll.decay;

            var screenHeight = scroll.$('screen').offsetHeight;
            var scrolRegionHeight = scroll.$('scrollMe').offsetHeight;

            var y = scroll.$('scrollMe').offsetTop - scroll.verticalOffset;
            var spriness = 0;

            // calculate a spriness when the text moves over the canvas size
            if (y > 0) {
                spriness = -y * scroll.sprinessOffset;
            } else if (y + scrolRegionHeight < screenHeight) {
                spriness = ((screenHeight - scrolRegionHeight - y) * scroll.sprinessOffset);
            }
            if (!scroll.canScrollFurther()) {
                scroll.\_velocity = -(scroll.\_velocity / 8)
            }
            scroll.$('scrollMe').style.top = (y + scroll.\_velocity + spriness) + 'px';
        }


    },
    canScrollFurther: function () {
        var \_top = scroll.$('scrollMe').offsetTop;
        var bottom = \_top + scroll.$('scrollMe').offsetHeight;
        var center = (scroll.$('screen').offsetTop + scroll.$('screen').offsetHeight) / 2;
        return (\_top < center && bottom > center);
    }
};

    
```
 

