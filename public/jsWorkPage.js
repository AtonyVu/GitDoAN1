import { listTaskk } from "./listTask.js";
let valueOn = document.querySelectorAll(".fa-power-off");
let btntime = document.querySelectorAll(".btn-success1");
let ctime = document.querySelectorAll(".containerSetTime");
let Icon = document.querySelectorAll(".iconheader");
let btnSavesetTime = document.querySelectorAll(".SavesetTime");
let btnDis = document.querySelectorAll(".btn-success1");
let valueTime = document.getElementById("inputValueTime");
let TextOn = document.querySelectorAll(".on");
let activeFooter = document.querySelectorAll(".footer-item");
let checkstate = false;
let inputtimeset = document.querySelectorAll(".valueMinute");
let weather = document.getElementById("weather");
let vitri = document.getElementById("vitri");
let tempC = document.getElementById("tempC");
let humi = document.getElementById("humi");
console.log(valueOn.length);

for (let i = 0; i < btntime.length; i++) {
  btntime[i].addEventListener("click", () => {
    console.log(i);
    ctime[i].classList.remove("offSetTime");
    ctime[i].classList.add("onSetTime");
    // btntime[i].classList.remove("onSetTime");
    // btntime[i].classList.add("offSetTime");
    document.querySelector(".gara").classList.remove("active");
    document.querySelector(".living").classList.remove("active");
    document.querySelector(".kitchen").classList.add("active");
    document.getElementById("profile").classList.remove("active");
    document.getElementById("profile").classList.remove("show");
    document.getElementById("home").classList.remove("active");
    document.getElementById("home").classList.remove("show");
    document.getElementById("contact").classList.add("active");
    document.getElementById("contact").classList.add("show");
  });
}
for (let i = 0; i < btnSavesetTime.length; i++) {
  btnSavesetTime[i].addEventListener("click", () => {
    setInterval(function () {
      valueOn[i].classList.remove("activeoff");
      valueOn[i].classList.add("activeOn");
      TextOn[i].innerText = "ON";
      Icon[i].classList.remove("officonheader");
      Icon[i].classList.add("oniconheader");
      btnDis[i].removeAttribute("disabled", "");
      console.log(inputtimeset[i].value);
    }, parseInt(inputtimeset[i].value) * 1000);

    ctime[i].classList.remove("onSetTime");
    ctime[i].classList.add("offSetTime");

    document.querySelector(".gara").classList.remove("active");
    document.querySelector(".living").classList.add("active");
    document.querySelector(".kitchen").classList.remove("active");
    document.getElementById("profile").classList.remove("active");
    document.getElementById("profile").classList.remove("show");
    document.getElementById("home").classList.add("active");
    document.getElementById("home").classList.add("show");
    document.getElementById("contact").classList.remove("active");
    document.getElementById("contact").classList.remove("show");
  });
}
for (let i = 0; i < valueOn.length; i++) {
  valueOn[i].addEventListener("click", () => {
    if (TextOn[i].innerText == "ON") {
      valueOn[i].classList.remove("activeOn");
      valueOn[i].classList.add("activeoff");
      TextOn[i].innerText = "OFF";
      Icon[i].classList.remove("oniconheader");
      Icon[i].classList.add("officonheader");
      btnDis[i].setAttribute("disabled", "");
    } else {
      valueOn[i].classList.remove("activeoff");
      valueOn[i].classList.add("activeOn");
      TextOn[i].innerText = "ON";
      Icon[i].classList.remove("officonheader");
      Icon[i].classList.add("oniconheader");
      btnDis[i].removeAttribute("disabled", "");
    }
  });
}
for (let i = 0; i < activeFooter.length; i++) {
  activeFooter[i].addEventListener("click", () => {
    for (let i = 0; i < activeFooter.length; i++) {
      activeFooter[i].classList.remove("activeFoot");
    }
    activeFooter[i].classList.add("activeFoot");
  });
}
function AirChange() {
  window.location.assign("./rangePage.html");
}

function setValueTime() {
  let dt = new Date();
  console.log(dt.getHours());
  console.log(dt.getMinutes());
  console.log(dt.getSeconds());
  valueTime.value = dt.getHours() + ":" + dt.getMinutes();
}
setValueTime();
console.log(btntime.length);

let query = (id) => {
  return document.getElementById(id);
};
let inputTask = query("newTask");
let btnAdd = query("addItem");

let anima = document.getElementById("loading");
let luan = [];

let ulList = query("todo");
let List = query("completed");
btnAdd.addEventListener("click", async function (event) {
  event.preventDefault();
  let task = new listTaskk(
    parseInt(luan.length + 1),
    inputTask.value,
    "uncomple"
  );
  luan.push(task);
  let luan1 = [...luan];
  firebase.database().ref("Message/data").remove();
  luan = [...luan1];

  luan.forEach((item) => {
    firebase.database().ref("Message/data").push(item);
  });
  load();
});
const loaddata = () => {
  firebase
    .database()
    .ref("Message/data")
    .on("value", function (snapshot) {
      let datata = "";
      let i = 0;
      console.log(snapshot.val());
      luan = [];
      firebase.database().ref("Text").remove();
      for (let id in snapshot.val()) {
        luan.push(snapshot.val()[id]);
        if (snapshot.val()[id].status === "uncomple") {
          datata += snapshot.val()[id].textTask + ":";
        }
      }
      firebase.database().ref("Text").child("data").set(datata);
      console.log(datata);
      console.log("Value ne");
      load();
    });
};
const findIndex = (id) => {
  let vitri = luan.findIndex((item) => {
    return item.id == id;
  });
  return vitri;
};
const load = async () => {
  ulList.innerHTML = "";
  List.innerHTML = "";

  anima.style.display = "none";

  for (var i in luan) {
    if (luan[i].status == "uncomple") {
      ulList.innerHTML += `<li> <span>${luan[i].textTask}</span> <div><a id='item"${i}"' href='#' onclick='Itemlist1(${luan[i].id})'><i class='fa fa-check-circle'></i></a>  
    <a onclick='deletel(${luan[i].id})'>  <i class='fa fa-trash'></i></a>
    </div> 
    </li>`;
    } else {
      List.innerHTML += `<li> <span>${luan[i].textTask}</span> <div><a id='item"${i}"' href='#' onclick='Itemlist1(${luan[i].id})'><i class='fa fa-check-circle colorcom'></i></a>  
        <a onclick='deletel(${luan[i].id})'>   <i class='fa fa-trash'></i> </a>
        </div> 
        </li>`;
    }
  }
};
// const load1 = ()=> {

//     List.innerHTML='';
//     for(var i in comList.list)
//   {

//   }

// }

// sortAC.addEventListener("click",function(){
//     doList.list.sort();
//     comList.list.sort();
//     load();
//     load1();
// });
// sortCA.addEventListener("click",function(){
//     doList.list.sort().reverse();
//     comList.list.sort().reverse();
//     load();
//     load1();
// });

const Itemlist1 = (i) => {
  console.log("chay Item");
  let vitri = findIndex(i);
  let luan1 = [...luan];
  let change = { ...luan1[vitri] };

  if (luan1[vitri].status == "comple") {
    change.status = "uncomple";
  } else {
    change.status = "comple";
  }
  luan1[vitri] = change;
  firebase.database().ref("Message/data").remove();
  console.log("add");
  console.log(luan1);
  luan = luan1;
  luan.forEach((item) => {
    firebase.database().ref("Message/data").push(item);
  });
  load();
};
const deletel = async (id) => {
  let vitri = findIndex(id);
  let luan1 = [...luan];
  luan1.splice(vitri, 1);
  console.log(luan1);
  firebase.database().ref("Message/data").remove();
  luan = luan1;
  luan.forEach((item) => {
    firebase.database().ref("Message/data").push(item);
  });

  load();
};
window.Itemlist1 = Itemlist1;
window.deletel = deletel;
loaddata();
const Load = async (lati, longi) => {
  let data;
  let timezone = "";
  await fetch(
    "http://api.positionstack.com/v1/reverse?access_key=fa9022e4d287a38008d58090723eb12a&query=" +
      lati +
      "," +
      longi
  )
    .then((response) => response.json())
    .then((users) => {
      data = users;
    });
  console.log(data);
  return data;
};
const Load3 = async (lati, longti) => {
  let data;
  await fetch(
    `https://api.ipgeolocation.io/timezone?apiKey=1bf64be4ca514f6496ef027f00df0e20&lat=${lati}&long=${longti}`
  )
    .then((response) => response.json())
    .then((users) => {
      data = users;
    });
  console.log(data);
  return data;
};
const Load1 = async (lati, longi) => {
  let data;
  await fetch(
    `http://api.weatherapi.com/v1/current.json?key=71febe78bbc84865b6c33828210204&q=${lati},${longi}&aqi=no`
  )
    .then((response) => response.json())
    .then((users) => {
      data = users;
    });
  console.log(data);
  return data;
};
function geoFindMe() {
  // const status = document.querySelector("#status");
  // const mapLink = document.querySelector("#map-link");

  // mapLink.href = "";
  // mapLink.textContent = "";

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // status.textContent = "";

    let data1 = await Load(latitude, longitude);
    let dataWe = await Load1(latitude, longitude);
    var res = dataWe.location.localtime.split(" ");
    var res1 = res[1].split(":");

    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Vị trí hiện tại : ${data1.data[0].county}, ${data1.data[0].region}, ${data1.data[0].country}`;
    weather.innerText = dataWe.current.condition.text;
    vitri.innerText =
      data1.data[0].county +
      ", " +
      data1.data[0].region +
      ", " +
      data1.data[0].country;
    humi.innerText = dataWe.current.humidity;
    tempC.innerText = dataWe.current.temp_c;
    await firebase
      .database()
      .ref("Location/Local/")
      .update({
        Nuoc: data1.data[0].country,
        Quan: data1.data[0].county,
        City: data1.data[0].region,
        Weather: dataWe.current.condition.text,
        hour: parseInt(res1[0]),
        minute: parseInt(res1[1]),
        Huminity: dataWe.current.humidity,
        temp_c: dataWe.current.temp_c,
      });
  }

  function error() {
    // status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    // status.textContent = "Geolocation is not supported by your browser";
  } else {
    // status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // document.getElementById("message").value = "";
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);

function Message1() {
  var Message = document.getElementById("message").value;
  firebase.database().ref("Message/data").update({ Message: Message });
  document.getElementById("message").value = "";
}
geoFindMe();
firebase
  .database()
  .ref("Sensor")
  .on("child_changed", function (snapshot) {
    console.log("Thay doi roi do");
  });
