function sleep(ms){
    return new Promise(res => 
        setTimeout(res, ms));
}
async function wombo_combo(){
    var i = 0;
    var context = new AudioContext();
    var ms = 1000;
    while(true){
        var btn = document.createElement('button');
        i += 1;
        btn.innerHTML = i;
        btn.addEventListener('click', ()=>
        {
            var aud = document.getElementById("_audio");
            aud.play()
            ms = 10;
        })
        var n = document.getElementsByTagName("body")[0];
        await sleep(ms);
        n.appendChild(btn);
    };
};
