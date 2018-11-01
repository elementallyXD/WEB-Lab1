var myModule = (function() {
    'use strict';

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'nav navbar-nav nav-pills nav-justified MenuUl');
    document.getElementById('Menu').appendChild(ul);

    var MAP = [{
            title: "Home",
            url: "index.html"
        },

        {
            title: "Products >",
            url: "#",
            child: [{
                    title: "Strategy",
                    url: "#"
                },

                {
                    title: "RPG >",
                    url: "#",
                    verticalMenu: [{
                            title: "AS:Origin",
                            url: "#"
                        },
                        {
                            title: "AS:Odyssey",
                            url: "#"
                        }
                    ],
                },

                {
                    title: "Shooter",
                    url: "#"
                },
                {
                    title: "List",
                    url: "#"
                }
            ],
        },

        {
            title: "AboutUs",
            url: "About.html"
        },

        {
            title: "Contacts",
            url: "Contacts.html"
        },

        {
            title: "History",
            url: "History.html"
        }

    ];

    MAP.forEach(renderProductList);

    function renderProductList(element, index, arr) {
        var li = document.createElement('li');
        li.setAttribute('class', 'nav-item');

        if (MAP[index].child != null) {
            li.setAttribute('id', 'menu');
        }

        ul.appendChild(li);

        li.innerHTML = "<a class='" + "nav-link" + "' href='" + MAP[index].url + "'>" + MAP[index].title + "</a>";

        if (MAP[index].child != null) {
            dropDownMenu(index);
        }
    }

    function dropDownMenu(index) {
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'DropDown');
        document.getElementById('menu').appendChild(ul);

        for (var iter = 0; iter < MAP[index].child.length; iter++) {
            var li = document.createElement('li');
            li.setAttribute('id', 'DropItem');
            li.setAttribute('class', 'nav-item');
            ul.appendChild(li);
            li.innerHTML = "<a class='" + "nav-link" + "' href='" + MAP[index].child[iter].url + "'>" + MAP[index].child[iter].title + "</a>";

            if (MAP[index].child[iter].verticalMenu != null) {
                li.setAttribute('id', 'DropItemF');
                verticalMenu(li, index, iter);
            }
        }
    }

    function verticalMenu(HTMLLIElement, index, iter) {
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'VerticalMenu');
        HTMLLIElement.appendChild(ul);

        for (let vIter = 0; vIter < MAP[index].child[iter].verticalMenu.length; vIter++) {
            var li = document.createElement('li');
            li.setAttribute('id', 'VerticalItem');
            li.setAttribute('class', 'nav-item');
            ul.appendChild(li);
            li.innerHTML = "<a class='" + "nav-link" + "' href='" + MAP[index].child[iter].verticalMenu[vIter].url + "'>" + MAP[index].child[iter].verticalMenu[vIter].title + "</a>";
        }
    }

    function dropDownListener() {
        var dropMenu = document.getElementById('menu');
        if (dropMenu)
            dropMenu.addEventListener("mouseenter", openDropDownMenu);

        function openDropDownMenu() {
            document.getElementById("DropDown").classList.toggle("active");
        }
    }

    function vertMenuListener() {
        var VertMenu = document.getElementById('DropItemF');
        if (VertMenu)
            VertMenu.addEventListener("mouseenter", openVerticalMenu);

        function openVerticalMenu() {
            document.getElementById("VerticalMenu").classList.toggle("active")
        }
    }
    return {
        DownMenu: dropDownListener,
        VerticalMenu: vertMenuListener
    };
}());

myModule.DownMenu();
myModule.VerticalMenu();