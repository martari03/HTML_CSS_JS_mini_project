// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.
let info = document.querySelector('.info');
let userInfo = document.createElement('div');
userInfo.classList.add('user');
let postsInfo = document.createElement('div');
postsInfo.classList.add('posts');
let url = new URL(location.href);
let id = url.searchParams.get("id");
fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(request => request.json())
    .then(user => {
            let h2 = document.createElement('h2');
            h2.innerText = `${user.id}. ${user.name}`
            userInfo.appendChild(h2);
            let ul = document.createElement('ul');
            for (const element in user) {
                const li = document.createElement('li');
                if (typeof user[element] !== 'object') {
                    li.innerHTML = `<b>${element.toUpperCase()}</b>: ${user[element]}`;
                } else {
                    li.innerHTML = `<b>${element.toUpperCase()}:</b>`
                    let ul2 = document.createElement('ul');
                    for (const key in user[element]) {
                        const li2 = document.createElement('li');
                        if (typeof user[element][key] !== 'object') {
                            li2.innerHTML = `<b>${key.toUpperCase()}</b>: ${user[element][key]}`;
                        } else {
                            li2.innerHTML = `<b>${key.toUpperCase()}</b>:`;
                            let ul3 = document.createElement('ul');
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
            }
            let postsButton = document.createElement('button');
            postsButton.classList.add('button');
            postsButton.innerText = 'Posts of current user'
            info.append(userInfo, postsButton);
            postsButton.onclick = function () {
                fetch("https://jsonplaceholder.typicode.com/users/" + id + "/posts")
                    .then(response => response.json())
                    .then(posts => {
                        let titles = document.createElement('div');
                        titles.classList.add('container');
                        let userName = document.createElement('h2');
                        userName.innerText = `Posts of ${user.name}:`;
                        for (const post of posts) {
                            let postDetails = document.createElement('div');
                            postDetails.classList.add('postDetails');
                            let titleElement = document.createElement('div');
                            titleElement.classList.add('post');
                            titleElement.innerText = `${post.title}`;
                            let details = document.createElement('button');
                            details.classList.add('details');
                            details.innerText = 'Post details';
                            postDetails.append(titleElement, details);
                            titles.appendChild(postDetails);
                            postsInfo.append(userName, titles);
                            details.onclick = function () {
                                location.href = `post-details.html?post=${JSON.stringify(post)}`;
                            }
                        }
                        info.appendChild(postsInfo);
                    });
            }
        }
    );