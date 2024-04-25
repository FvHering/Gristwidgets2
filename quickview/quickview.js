
function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var personenName = "";

ready(function() {
  grist.ready({requiredAccess: 'read table'});
    grist.onRecord(function (record) {
      personenName = record.Name;
    });
});

const app = Vue.createApp({
  setup () {
    var aHexColor = "";
    var initials = "";

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
      var name2 = personenName;
      var s = 60;
      var l = 30;
      var textColor = l > 70 ? "#555" : "#fff";
      return stringToHslColor(name2, s, l);
    }


    Vue.watch(() => personenName, (newValue) => {
      aHexColor.value = 'backgroundColor: ' + stringToHslColor(newValue, 60, 30);
      initials.value = getInitials(newValue);
    });

    
    return {
      personenName,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      aHexColor,
      initials,
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
    }
  }
});

app.use(Quasar)
app.mount('#q-app')

