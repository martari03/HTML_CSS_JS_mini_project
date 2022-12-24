// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  -
// https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
const url = new URL(location.href);
const post = url.searchParams.get("post");
const info = document.querySelector('.info');
const postInfo = document.createElement('div');
postInfo.classList.add('postInfo');
const postComments = document.createElement('div');
postComments.classList.add('postComments');
// const post = JSON.parse(postData);
const postInfoDiv = document.createElement('div');
postInfoDiv.classList.add('postInfoDiv');
const h2 = document.createElement('h2');
h2.innerText = 'Selected post:';
const btnHolder = document.createElement('div');
btnHolder.classList.add('btnHolder');
const toFirstPage = document.createElement('button');
toFirstPage.innerText = 'To first page';
toFirstPage.classList.add('first');
toFirstPage.onclick = function () {
    location.href = './index.html';
}
const toPreviousPage = document.createElement('button');
toPreviousPage.innerText = 'To previous page';
toPreviousPage.classList.add('previous');
btnHolder.append(toFirstPage, toPreviousPage);
info.appendChild(btnHolder);
fetch("https://jsonplaceholder.typicode.com/posts/" + post)
    .then(response => response.json())
    .then(post => {
        toPreviousPage.onclick = function () {
            location.href = './user-details.html?id=' + post.userId;
        }
        for (const key in post) {
            if (key === 'title') {
                const div = document.createElement('div');
                div.classList.add('title');
                div.innerHTML = `<b>${post[key].toUpperCase()}</b>`;
                postInfoDiv.appendChild(div);
            }
            if (key === 'body') {
                const div = document.createElement('div');
                div.classList.add('body');
                div.innerText = `${post[key]}`;
                postInfoDiv.appendChild(div);
            }
        }
        postInfo.append(h2, postInfoDiv);
        fetch("https://jsonplaceholder.typicode.com/posts/" + `${post.id}` + "/comments")
            .then(response => response.json())
            .then(comments => {
                const h3 = document.createElement('h3');
                h3.innerText = 'Comments of selected post:';
                const list = document.createElement('div');
                list.classList.add('list');
                for (const comment of comments) {
                    const commentInfoList = document.createElement('div');
                    commentInfoList.classList.add('comment');
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('userDiv');
                    for (const value in comment) {
                        if (value === 'name' || value === 'email') {
                            const commentInfo = document.createElement('div');
                            commentInfo.classList.add('userInfo');
                            commentInfo.innerHTML = `<b>${value.toUpperCase()}:</b> ${comment[value]}`;
                            userDiv.appendChild(commentInfo);
                            commentInfoList.appendChild(userDiv);
                        }
                        if (value === 'body') {
                            const commentInfo = document.createElement('div');
                            commentInfo.classList.add('commentBody');
                            commentInfo.innerText = `${comment[value]}`;
                            commentInfoList.appendChild(commentInfo);
                        }
                    }
                    list.appendChild(commentInfoList);
                }
                postComments.append(h3, list);
            });
    });
info.append(postInfo, postComments);