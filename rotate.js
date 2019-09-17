/*

Title:		rotateJs
Author:		Muhammad Usman Khalil
Version:	0.0.1
Website:	
License: 	

rotateJs Options

transitionSpeed :		    effect transistion speed in ms (still to be implemented)
effect :			        transition effect [fade] (still to be implemented)
visibleInterval :		    time an element is shown for
subRotationSpeedDivisor :	fraction on which "visibleInterval" should be divided for sub rotations
skipClass :		            class name applied to skip an element [default: 'skip']
rotateClass :			    class name applied to rotate an element [default: 'rotate']

rotateJs Description

Init example:
$('# < Element ID >').rotate();

Add element on run time:
$('# < Element ID >').push(< New Element >);
*/

(function ($) {


    var elems = [];

    $.fn.rotate = function (settings) {
        var config = {
            transitionSpeed: 600,
            effect: 'fade',
            visibleInterval: 4000,
            subRotationSpeedDivisor: 4,
            skipClass: 'skip',
            rotateClass: 'rotate'
        };

        if (settings) $.extend(true, config, settings);


        var parent = $(this)[0];

        $.each(parent.children, function (index, childElems) {
            if ($(childElems).length > 1) {
                var subElems = [];
                $.each($(childElems).children, function (subIndex, subChildElems) {
                    subElems.push(subChildElems);
                });
                elems.push(subElems);
            }
            elems.push(childElems);
        });

        var timeSpent = 0;
        var index = 0;

        var subTimer = '';
        var subIndex = 0;

        if (!$(elems[index]).hasClass(config.skipClass)) {
            handleRotation();
        } else {
            index++;
            handleRotation();
        }

        function handleSubRotation() {
            debugger;
            if (timeSpent < config.visibleInterval) {
                if (subIndex == elems[index].childElementCount) {
                    subIndex = 0;
                }
                if (!$($(elems[index])[0].children[subIndex]).hasClass(config.skipClass)) {
                    show('#test', $(elems[index])[0].children[subIndex].innerHTML);
                    subIndex++;
                } else {
                    subIndex++;
                    if (subIndex == elems[index].childElementCount) {
                        subIndex = 0;
                    }
                    show('#test', $(elems[index])[0].children[subIndex].innerHTML);
                }
                timeSpent += config.visibleInterval / config.subRotationSpeedDivisor;
                subTimer = setTimeout(handleSubRotation, (config.visibleInterval / config.subRotationSpeedDivisor));
            } else {
                clearTimeout(subTimer);
                timeSpent = 0;
                subIndex = 0;
                index++;
            }
        }

        function handleRotation() {
            if (index == elems.length) {
                index = 0;
            }
            if (!$(elems[index]).hasClass(config.skipClass)) {
                if ($(elems[index]).hasClass(config.rotateClass)) {
                    handleSubRotation();
                } else {
                    show('#test', elems[index]);
                    index++;
                }
            } else {
                index++;
            }
            timer = setTimeout(handleRotation, config.visibleInterval);
        }
    };

    $.fn.push = function push(newElem) {
        elems.push(newElem);
    }

    function show(elem, content) {
        $(elem).html(content);
    }
})(jQuery);
