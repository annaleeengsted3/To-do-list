"use strict";

// let uploaded;

const form = document.querySelector("form");
form.setAttribute("novalidate", true);

// form.elements.name.addEventListener("focus", event => {
//   form.elements.name.classList.remove("notValid");
// });

// form.elements.name.addEventListener("blur", event => {
//   if (form.elements.name.checkValidity()) {
//     form.elements.name.classList.remove("notValid");
//   } else {
//     form.elements.name.classList.add("notValid");
//   }
// });

// document.querySelector("form").addEventListener("mouseover", () => {
//   document.querySelector("form").style.height = "60vh";
// });

form.addEventListener("submit", event => {
  event.preventDefault();
  //prevents the page from reloading after submit i spressed
  let polObject = {
    title: form.elements.title.value,
    details: form.elements.details.value,
    due: form.elements.due.value
  };
  //   uploaded = true;

  console.log(polObject);
  post(polObject);
});

form.addEventListener("blur", event => {
  //now the user has moved away from the textfield, now we can validate it.
});

function get() {
  fetch("https://boris-fee7.restdb.io/rest/todolist", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887f15fd86cb75861e2629",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(items => {
      console.log(items);
      items.forEach(addItem);
    });

  // document.querySelector(".addPol").addEventListener("click", e => {
  //   post();
  // });
}
get();

function post(data) {
  //   const data = {
  //     name: "Duke",
  //     party: "Mayor of Cormorant Village, Minnesota",
  //     age: 13,
  //     iq: 12000,
  //     idiot: false,
  //     img: "duke.jpg"
  //   };

  addItem(data);

  const postData = JSON.stringify(data);
  fetch("https://boris-fee7.restdb.io/rest/todolist", {
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
      //   addPolitician(data);
    });
}

function addItem(item) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".title").textContent = item.title;
  copy.querySelector(".details").textContent = item.details;
  copy.querySelector(".due").innerHTML = item.due;

  copy.querySelector(".item").dataset.itemid = item._id;
  copy.querySelector(".delete").addEventListener("click", () => {
    deleteIt(item._id);
  });

  document.querySelector("#container").prepend(copy);
  //   document.querySelector("#politicians").appendChild(copy);
}

//delete:

function deleteIt(id) {
  fetch("https://boris-fee7.restdb.io/rest/todolist/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887f15fd86cb75861e2629",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("delete it" + id);
      document.querySelector(`.item[data-itemid="${id}"]`).remove();
    });
}

// fetch("https://boris-fee7.restdb.io/rest/politicians/SOME_ID", {
//     method: "delete",
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       'x-apikey': "your-cors-api-key",
//       "cache-control": "no-cache"
//     }
// })
//   .then(res=>res.json())
//   .then(data=>console.log(data));
