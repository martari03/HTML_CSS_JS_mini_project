// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  -
// https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
let url = new URL(location.href);
let postData = url.searchParams.get("post");
let info = document.querySelector('.info');
let postInfo = document.createElement('div');
postInfo.classList.add('postInfo');
let postComments = document.createElement('div');
postComments.classList.add('postComments');
let post = JSON.parse(postData);
let postInfoDiv = document.createElement('div');
postInfoDiv.classList.add('postInfoDiv');

let h2 = document.createElement('h2');
h2.innerText = 'Selected post:'
for (const key in post) {
    if (key === 'title') {
        let div = document.createElement('div');
        div.classList.add('title');
        div.innerHTML = `<b>${post[key].toUpperCase()}</b>`
        postInfoDiv.appendChild(div);
    }
    if (key === 'body'){
        let div = document.createElement('div');
        div.classList.add('body');
        div.innerText = `${post[key]}`
        postInfoDiv.appendChild(div);
    }
}
postInfo.append(h2, postInfoDiv);
fetch("https://jsonplaceholder.typicode.com/posts/" + `${post.id}` + "/comments")
    .then(response => response.json())
    .then(comments => {
        let h3 = document.createElement('h3');
        h3.innerText = 'Comments of selected post:';
        let list = document.createElement('div');
        list.classList.add('list');
        for (const comment of comments) {
            let commentInfoList = document.createElement('div');
            commentInfoList.classList.add('comment');
            let userDiv =document.createElement('div');
            userDiv.classList.add('userDiv');
            for (const value in comment) {
                if (value === 'name' || value === 'email') {
                    let commentInfo = document.createElement('div');
                    commentInfo.classList.add('userInfo');
                    commentInfo.innerHTML = `<b>${value.toUpperCase()}:</b> ${comment[value]}`;
                    userDiv.appendChild(commentInfo);
                    commentInfoList.appendChild(userDiv);
                }
                if (value === 'body') {
                    let commentInfo = document.createElement('div');
                    commentInfo.classList.add('commentBody');
                    commentInfo.innerText = `${comment[value]}`;
                    commentInfoList.appendChild(commentInfo);
                }
            }
            list.appendChild(commentInfoList);
        }
        postComments.append(h3, list);
    });
info.append(postInfo, postComments);