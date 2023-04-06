$(document).ready(function() {
    //toggle mobile menu
    $("[data-mobile=menu-icon]").click(function() {
        $("[data-mobile=menu").slideToggle()
    });

    //testimonial tab handler
    $(".Tabs [data-tab]").click(function() {
        let targetEl = $(this).attr('data-tab');
        $('.Tabs [data-tab]').css({
            'box-shadow': 'none',
            'background-color': 'transparent'
        });

        $('.Tabs .tab-item').css({
            'display': 'none'
        });
        $(this).css({
            'box-shadow': '-8px 6px 20px 1px rgb(3 40 61 / 30%)',
            'background-color': '#ffffff'
        });

        $('.Tabs .tab-item#' + targetEl).show();
    });

    //check box handler
    $("input[type=checkbox]").change(function() {
        console.log('clicked')
        let mainCheckBox = $(this).parent().children('.main-check-box');
        if ($(this).is(':checked')) {
            mainCheckBox.css({
                'border-color': '#00aa64',
                'background-image': 'url(/src/images/green-custom-checkbox.svg)'
            });
        } else {
            mainCheckBox.attr('style', '');
        }
    });

    let prevScrollSize = 0;
    $(window).scroll(function() {
        let topScrollSize = 80;
        let navEl = $('nav.navbar');

        let mbStatus = false;

        if (window.innerWidth > 768) {
            mbStatus = true;
        } else {
            if ($("[data-mobile=menu").is(':hidden')) {
                mbStatus = true;
            } else {
                mbStatus = false;
            }
        }

        let currentScrollSize = window.scrollY;
        if (currentScrollSize >= topScrollSize) {
            navEl.css({
                'background-color': '#ffffff'
            });
            if (currentScrollSize >= topScrollSize && currentScrollSize > prevScrollSize && mbStatus) {
                navEl.css({
                    'top': '-1rem',
                    'opacity': '0'
                });
            } else {
                navEl.css({
                    'top': '0',
                    'opacity': '1'
                });
            }
            prevScrollSize = currentScrollSize;
        } else {
            navEl.css({
                'background-color': 'transparent'
            });
        }
    });

    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        /*loop through a collection of all HTML elements:*/
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain attribute:*/
            file = elmnt.getAttribute("include-html");
            if (file) {
                /*make an HTTP request using the attribute value as the file name:*/
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /*remove the attribute, and call this function once more:*/
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                /*exit the function:*/
                return;
            }
        }
    };

    includeHTML();

});