var myModule = (function() {
    'use strict';

    var ul = document.createElement('ul');
    ul.setAttribute('id', 'MenuUl');
    document.getElementById('Menu').appendChild(ul);

    var MAP = [{
            title: "Main",
            url: "index.html"
        },

        {
            title: "About",
            url: "About.html"
        },

        {
            title: "Contacts",
            url: "Contacts.html"
        },

        {
            title: "Products >",
            url: "#",
            child: [{
                    title: "RPG >",
                    url: "#",
                    verticalMenu: [{
                            title: "AS:Origin",
                            url: "ASOrigin.html"
                        },
                        {
                            title: "AS:Odyssey",
                            url: "ASOdyssey.html"
                        }
                    ],
                },
                {
                    title: "Strategy",
                    url: "Strategy.html"
                },
                {
                    title: "Shooter",
                    url: "Shooter.html"
                },
                {
                    title: "List",
                    url: "Products.html"
                }
            ],
        },

        {
            title: "History",
            url: "History.html"
        }

    ];

    MAP.forEach(renderProductList);

    function renderProductList(element, index, arr) {
        var li = document.createElement('li');

        if (MAP[index].child != null) {
            li.setAttribute('id', 'menu');
        }

        ul.appendChild(li);

        li.innerHTML = "<a href='" + MAP[index].url + "'>" + MAP[index].title + "</a>";

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
            ul.appendChild(li);
            li.innerHTML = "<a href='" + MAP[index].child[iter].url + "'>" + MAP[index].child[iter].title + "</a>";

            if (MAP[index].child[iter].verticalMenu != null) {
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
            ul.appendChild(li);
            li.innerHTML = "<a href='" + MAP[index].child[iter].verticalMenu[vIter].url + "'>" + MAP[index].child[iter].verticalMenu[vIter].title + "</a>";
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
        var VertMenu = document.getElementById('DropItem');
        if (VertMenu)
            VertMenu.addEventListener("click", openVerticalMenu);

        function openVerticalMenu() {
            document.getElementById("VerticalMenu").classList.toggle("active")
        }
    }
    return {
        DownMenu: dropDownListener,
        VerticalMenu: vertMenuListener,
        renderProductList: renderProductList,
        Menu: MAP
    };
}());

myModule.DownMenu();
myModule.VerticalMenu();