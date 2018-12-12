let myModule = (function() {
    'use strict';

    function firstStep() {
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'nav navbar-nav nav-pills nav-justified MenuUl');
        ul.setAttribute('id', 'ul');
        document.getElementById('Menu').appendChild(ul);

        return ul;
    }

    function makeMenu(arr, i, element) {
        var li = document.createElement('li');
        li.setAttribute('class', 'nav-item');

        element.appendChild(li);
        li.innerHTML = "<a class='" + "nav-link" + "' href='" + arr[i].url + "'>" + arr[i].title + "</a>";

        if (arr[i].dropMenu != null) {
            var ul = document.createElement('ul');
            ul.setAttribute('class', 'DropMenu');
            li.setAttribute('class', 'DropElement');
            li.appendChild(ul);
            dropDownListener1(i);
            makeMenu(arr[i].dropMenu, 0, ul);
        }

        if (arr[i].verticalMenu != null) {
            var ul = document.createElement('ul');
            ul.setAttribute('id', 'VerticalMenu');
            li.setAttribute('id', 'VerticalElement');
            li.appendChild(ul);
            makeMenu(arr[i].verticalMenu, 0, ul);
        }

        i++;
        if (i < arr.length) makeMenu(arr, i, element);
    }

    function dropDownListener() {
        // function openDropDownMenu() {
        //     var drop = document.getElementsByClassName('DropMenu');

        //     for (var i = 0; i < drop.length; i++) {
        //         drop[i].classList.toggle("active");
        //     }
        // }

        // var dropElement = document.getElementsByClassName('DropElement');

        // for (var i = 0; i < dropElement.length; i++) {
        //     dropElement[i].addEventListener("mouseenter", openDropDownMenu, false);
        // }
    }

    function dropDownListener1(i) {
        function openDropDownMenu() {
            var drop = document.getElementsByClassName('DropMenu');
            drop[i].classList.toggle("active");
        }

        var dropElement = document.getElementsByClassName('DropElement');
        dropElement[i].addEventListener("mouseenter", openDropDownMenu, false);
    }

    function vertMenuListener() {
        var VertMenu = document.getElementById('VerticalElement');
        if (VertMenu)
            VertMenu.addEventListener("mouseenter", openVerticalMenu);

        function openVerticalMenu() {
            document.getElementById("VerticalMenu").classList.toggle("active")
        }
    }

    function removeElement() {
        var list = document.getElementById('Menu');
        list.removeChild(list.childNodes[2]);
    }

    return {
        init: firstStep,
        DownMenu: dropDownListener,
        VerticalMenu: vertMenuListener,
        Menu: makeMenu,
        removeMenu: removeElement,
    };
}());

export { myModule };