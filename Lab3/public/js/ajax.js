import { myModule } from './Menu.js';
import { MAP } from './MAP.js'

let writeButton = document.querySelector('#writeButton');
let readButton = document.querySelector('#readButton');

writeButton.addEventListener('click', function() {
    (async() => {
        await fetch('/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, must-revalidate'
                },
                body: JSON.stringify(MAP),
            })
            .catch(error => {
                console.error(error);
            });
    })();
});

readButton.addEventListener('click', function() {
    (async() => {
        await fetch(`/read`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(response) {
                console.log(`\nResponse status (get)= ${response.status}`);
                return response.json()
            })
            .then(myJson => {
                console.log(myJson);
                myModule.removeMenu();
                myModule.Menu(myJson, 0, myModule.init());
                myModule.DownMenu();
                myModule.VerticalMenu();
            }).catch(error => console.log(error));
    })();
});