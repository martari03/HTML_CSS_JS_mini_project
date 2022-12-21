// index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
let info = document.querySelector('.info');
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
        for (const user of users) {
            let div = document.createElement('div');
            div.classList.add('user');
            let h3 = document.createElement('h3');
            h3.innerText = `${user.id}. ${user.name}`;
            let button = document.createElement('button');
            button.classList.add('button');
            button.innerText = 'Details';
            div.append(h3, button);
            info.appendChild(div);
            button.onclick = function (){
                location.href = `user-details.html?id=${user.id}`;
            };
        }
    });