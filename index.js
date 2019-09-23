"use strict";

function get() {
  fetch("https://boris-fee7.restdb.io/rest/politicians", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887f15fd86cb75861e2629",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(politicians => {
      console.log(politicians);
      politicians.forEach(addPolitician);
    });

  document.querySelector("button").addEventListener("click", e => {
    post();
  });
}
get();

function post() {
  const data = {
    name: "Duke",
    party: "Mayor of Cormorant Village, Minnesota",
    age: 13,
    iq: 12000,
    idiot: false,
    img: "duke.jpg"
  };

  const postData = JSON.stringify(data);
  fetch("https://boris-fee7.restdb.io/rest/politicians", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887f15fd86cb75861e2629",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      addPolitician(data);
    });
}

function addPolitician(politician) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h2").textContent = politician.name;
  copy.querySelector("h3").textContent = politician.party;
  copy.querySelector(".age").textContent = politician.age;
  copy.querySelector(".iq").textContent = politician.iq;
  copy.querySelector(".idiot").textContent = `Is idiot? ${politician.idiot}`;
  if (politician.name == "Duke") {
    copy.querySelector("img").src = politician.img;
  } else {
    copy.querySelector("img").src = `https://boris-fee7.restdb.io/media/${politician.img}?s=t`;
  }

  document.querySelector("#politicians").appendChild(copy);
}

//delete:

// fetch("someurl/SOME_ID", {
//     method: "delete",
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       'x-apikey': "your-cors-api-key",
//       "cache-control": "no-cache"
//     }
// })
//   .then(res=>res.json())
//   .then(data=>console.log(data));
