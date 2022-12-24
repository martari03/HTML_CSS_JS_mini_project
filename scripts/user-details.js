// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.
const info = document.querySelector('.info');
const userContainer = document.createElement('div');
userContainer.classList.add('userDiv');
const userInfo = document.createElement('div');
userInfo.classList.add('user');
const postsInfo = document.createElement('div');
postsInfo.classList.add('posts');
const url = new URL(location.href);
const id = url.searchParams.get("id");
const btnHolder = document.createElement('div');
btnHolder.classList.add('btnHolder');
const toPreviousPage = document.createElement('button');
toPreviousPage.innerText = 'To previous page';
toPreviousPage.classList.add('previous')
toPreviousPage.onclick = function (){
    location.href = './index.html';
}
btnHolder.appendChild(toPreviousPage);
info.appendChild(btnHolder);
fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(request => request.json())
    .then(user => {
            const h2 = document.createElement('h2');
            h2.innerText = `${user.id}. ${user.name}`;
            userInfo.appendChild(h2);
            const ul = document.createElement('ul');
            for (const element in user) {
                const li = document.createElement('li');
                if (typeof user[element] !== 'object') {
                    li.innerHTML = `<b>${element.toUpperCase()}</b>: ${user[element]}`;
                } else {
                    li.innerHTML = `<b>${element.toUpperCase()}:</b>`;
                    const ul2 = document.createElement('ul');
                    for (const key in user[element]) {
                        const li2 = document.createElement('li');
                        if (typeof user[element][key] !== 'object') {
                            li2.innerHTML = `<b>${key.toUpperCase()}</b>: ${user[element][key]}`;
                        } else {
                            li2.innerHTML = `<b>${key.toUpperCase()}</b>:`;
                            const ul3 = document.createElement('ul');
                            for (const item in user[element][key]) {
                                const li3 = document.createElement('li');
                                if (typeof user[element][key][item] !== 'object') {
                                    li3.innerHTML = `<b>${item.toUpperCase()}</b>: ${user[element][key][item]}`;
                                }
                                ul3.appendChild(li3);
                                li2.appendChild(ul3);
                            }
                        }
                        ul2.appendChild(li2);
                        li.appendChild(ul2);
                    }
                }
                ul.appendChild(li);
                userInfo.append(h2, ul);
                userContainer.appendChild(userInfo);
            }
            const postsButton = document.createElement('button');
            postsButton.classList.add('button');
            postsButton.innerText = 'Posts of current user';
            userContainer.appendChild(postsButton);
            info.append(userContainer);
            postsButton.onclick = function () {
                userContainer.classList.add('none');
                toPreviousPage.innerText = 'Return to info about user';
                fetch("https://jsonplaceholder.typicode.com/users/" + id + "/posts")
                    .then(response => response.json())
                    .then(posts => {
                        const titles = document.createElement('div');
                        titles.classList.add('container');
                        const userName = document.createElement('h2');
                        userName.innerText = `Posts of ${user.name}:`;
                        for (const post of posts) {
                            const postDetails = document.createElement('div');
                            postDetails.classList.add('postDetails');
                            const titleElement = document.createElement('div');
                            titleElement.classList.add('post');
                            titleElement.innerText = `${post.title}`;
                            const details = document.createElement('button');
                            details.classList.add('details');
                            details.innerText = 'Post details';
                            postDetails.append(titleElement, details);
                            titles.appendChild(postDetails);
                            postsInfo.append(userName, titles);
                            details.onclick = function () {
                                location.href = `post-details.html?post=${post.userId}`;
                            }
                            toPreviousPage.onclick = function () {
                                postsInfo.classList.add('none');
                                userContainer.classList.remove('none');
                                toPreviousPage.innerText = 'To previous page';
                            }
                        }
                        info.appendChild(postsInfo);
                    });
                postsButton.disabled = true;
            }
        }
    )