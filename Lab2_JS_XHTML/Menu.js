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
            dropMenu: [{
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

    /* MAP.forEach(renderProductList);

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
             ul.appendChild(li);
             li.innerHTML = "<a href='" + MAP[index].child[iter].verticalMenu[vIter].url + "'>" + MAP[index].child[iter].verticalMenu[vIter].title + "</a>";
         }
     }*/

    function dropDownListener() {
        var dropElement = document.getElementById('DropElement');
        if (dropElement)
            dropElement.addEventListener("mouseenter", openDropDownMenu);

        function openDropDownMenu() {
            document.getElementById("DropMenu").classList.toggle("active");
        }
    }

    function vertMenuListener() {
        var VertMenu = document.getElementById('VerticalElement');
        if (VertMenu)
            VertMenu.addEventListener("mouseenter", openVerticalMenu);

        function openVerticalMenu() {
            document.getElementById("VerticalMenu").classList.toggle("active")
        }
    }

    function makeMenu(arr, i, element) {
        var li = document.createElement('li');

        element.appendChild(li);
        li.innerHTML = "<a href='" + arr[i].url + "'>" + arr[i].title + "</a>";

        if (arr[i].dropMenu != null) {
            var ul = document.createElement('ul');
            ul.setAttribute('id', 'DropMenu');
            li.setAttribute('id', 'DropElement');
            li.appendChild(ul);
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

    return {
        DownMenu: dropDownListener,
        VerticalMenu: vertMenuListener,
        Menu: makeMenu,
        Array: MAP,
        GlobalElement: ul
    };
}());

myModule.Menu(myModule.Array, 0, myModule.GlobalElement);
myModule.DownMenu();
myModule.VerticalMenu();