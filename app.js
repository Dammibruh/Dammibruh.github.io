var main = new Vue({
  el: "#main",
  data: {
    url: "",
    btn: "shorten",
    clicked: false,
    mode: true,
    error: false,
    uri: window.location.href
  },
  methods: {
      random: function(ent, k){
          var b = [];
          for(var i = 0; i < k;i++){
            var gen = Math.floor(Math.random()*ent.length);
            b.push(ent[gen]);
          }
          return b;
      },
      request: function (method, url, data){
          $.ajax({
              method: method,
              url: url,
              data: data,
              success: function(d){
                  return d;
              }
          })
      },
      shorten: function(){
          if(this.check()){
            const digits = ['C', 'O', 'r', 'Y', 'V', 'i', 'j', 'z', 'h', 'y', '9', 'a', 'k', 'c', 'q', 'G', 'N', 'W', '6', 'b', 'Z', 'B', 'x', 'Q', '3', 'p', 'E', 'J', 'g', 'H', 'S', 'M', '5', 'f', 'n', 'm', 's', 'L', '0', 'l', '1', 'e', 'P', 'U', 'K', 'w', 'D', '8', 'I', 'v', 'T', '2', 'F', 'd', 'o', 't', 'A', '7', 'R', 'X', 'u', '4'];
            var d = null;
            const _shortened = this.random(digits, 6).join("");
            this.btn = "copy";
            $.ajax({
                method: "post", 
                url: "https://mishortener.herokuapp.com/shortener/", 
                data: {
                'url': this.url,
                },
                success: function(r){
                    var uri = window.location.href;
                    var inp = document.getElementById("_url");
                    inp.value = `${uri}${r}`;
                }
            });
          }
        },
      check: function(){
          return this.url.match("http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+");
      },
      _copy: function(){
          const tar = document.querySelector(".url")
            tar.select();
            tar.setSelectionRange(0, tar.value.length)
            document.execCommand("copy");
      }
  }
});

var error_404 = new Vue({
    el: "#error",
    data: {
        sec: 5
    },
    methods: {
        sleep: function(ms) {
                return new Promise(r => setTimeout(r , ms));
            },
        redr: async function(){
            for(var i = this.sec; i > 0; i--){
                await this.sleep(1000)
                this.sec = i;
            };
            const rgx =  /https:\/\/mish.cf\/(?<thingy>.*)/i
            var key = rgx.exec(window.location.href);
            $.ajax({
                method: "get",
                url: `https://mishortener.herokuapp.com/shortener/${key[1]}`,
                success: function(r){
                    window.location.href = r;
                }
            });
        }
    }
});
function redr(){
    error_404.redr();
}
