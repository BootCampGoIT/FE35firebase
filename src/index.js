import axios from 'axios';
import './styles.css';

const post = {
  title: '',
  message: ''
}

// const messageForm = document.querySelector('.messageForm');
const messageForm = document.messageForm;
// const getDataButton = document.querySelector('.getDataButton');
const postsList = document.querySelector('.postsList');

const getData = (e) => {
  // console.log(e.target.value)
  // if (e.target.name === 'title') {
  //   post.title = e.target.value;
  // }
  // if (e.target.name === 'message') {
  //   post.message = e.target.value;
  // }
  // // console.log(post)
  // console.log(e.target.name)
  post[e.target.name] = e.target.value
}

const createPost = (e) => {
  e.preventDefault();
  // GET, POST, PUT, PATCH, DELETE

  axios.post('https://fe35-database.firebaseio.com/posts.json', post)
    .then(response => posts.push({id: response.data.name, ...post}))
    .then(()=> postsList.innerHTML = createMarkup(posts))
    .catch((error) => console.log(error))
    .finally(() => {
      post.title = '';
      post.message = '';
      // messageForm.title.value = '';
      // messageForm.message.value = '';
      messageForm.reset();
    })
}

const posts = [];

const getPosts = () => {
  axios.get('https://fe35-database.firebaseio.com/posts.json')
    .then(response => {
      for (const key in response.data) {
        // console.log(key);
        // console.log(response.data[key]);
        posts.push({ id: key, ...response.data[key] })
      }
      return posts
    }).then(posts => postsList.innerHTML = createMarkup(posts))
    // .then(response => console.log(response.data))
    .catch((error) => console.log(error))
}

const createMarkup = (posts) => {
  let innerMarkup = '';
  posts.forEach(element => {
    innerMarkup += `
    <li class="listItem">
    <p class="postTitle">${element.title}</p>
    <p class="postMessage">${element.message}</p>
    <button class="deletButton" data-id=${element.id}>Delete post</button>
  </li>
    `
  });
  return innerMarkup
}

getPosts();
messageForm.addEventListener('input', getData);
messageForm.addEventListener('submit', createPost);
// getDataButton.addEventListener('click', getPosts)




