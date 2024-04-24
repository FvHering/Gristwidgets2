import { ref } from "https://esm.sh/vue";

function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


const name = "";

function getInitials (fullName) {
  return fullName.split(' ').map(function(str) { return str ? str[0] : "";}).join('')
}


function stringToHslColor(str, s, l) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}


function updateColor() {
  var name2 = name;
  var s = 60;
  var l = 30;
  var textColor = l > 70 ? "#555" : "#fff";
  return stringToHslColor(name2, s, l);
}

ready(function() {
  grist.ready({requiredAccess: 'read table'});
    grist.onRecord(function (record) {
      name = record.Name;
    })
}


const app = Vue.createApp({
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      aHexColor: 'background-color: ' + updateColor(),
      name,
      initials: getInitials(name),
      gemeinde: {
        rodenberg: {
          gemeindeName: 'St. Johannes-Gemeinde Rodnberg',
          gemeindeFarbe: 'red'
        },
        stadthagen: {
          gemeindeName: 'Kreuzgemeinde Stadthagen',
          gemeindeFarbe: 'green'
        }
      }
      
    };
  }
});

app.use(Quasar, { config: {avatar: updateColor(),} });
app.mount("#q-app");
