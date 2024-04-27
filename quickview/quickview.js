
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
  data: () => ({
    personenName: "",
    initialas: getInitials(personenName),
    gemeinde: "",
    gliedschaftsStatus: "",
    aHexColor: "blue"
  }),
  
  created() {
    this.updateData()
  },

  watch: {
    record: 'updateData',
  },

  methods: {
    updateData() {
      personenName = record.Name,
      gemeinde = record.Gemeinde,
      gliedschaftsStatus = record.Gliedschaftsstatus,
      aHexColor = stringToHslColor(personenName, 60, 30)
     },
    
    getInitials (fullName) {
      return fullName.split(' ').map(function(str) { return str ? str[0] : "";}).join('')
    }
    
    stringToHslColor(str, s, l) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var h = hash % 360;
      return 'hsl('+h+', '+s+'%, '+l+'%)';
    }
    
    
    updateColor() {
      var name2 = personenName;
      var s = 60;
      var l = 30;
      var textColor = l > 70 ? "#555" : "#fff";
      return stringToHslColor(name2, s, l);
    }

  }
});

app.use(Quasar)
app.mount('#q-app')

