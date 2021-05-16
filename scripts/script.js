// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', () => {
          let curEntry = router.findEntry(entry); 

          window.history.pushState({page_id: 1, entry: entry}, "", "#entry" + curEntry);
          setState(entry); 

      });
    });
  });

  document.querySelector('h1').addEventListener('click', ()=> { 

    if(window.location.hash != ""){ 
      window.history.pushState({page_id: 0}, "", window.location.origin + "/Lab7/"); 
      setState(); 
    }

  }); 

  document.querySelector('img').addEventListener('click', () => {
    if(window.location.hash != "#settings"){ 
      window.history.pushState({page_id:2}, "", "#settings"); 
    }
  });

  // Moving through session history
  window.addEventListener('popstate', (event) => {
    if(event.state == null) {
      setState();
      return;
    }
    
    if(event.state.page_id == 1) {
      setState(event.state.entry);
    }else {
      setState();
    }
  });
  
}); 

//Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

