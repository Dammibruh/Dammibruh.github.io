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
      shorten: function(){
          if(this.check()){
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
        redr: function(){
            const rgx =  "/https:\/\/mish.cf\/(?<thingy>.*)/i";
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
