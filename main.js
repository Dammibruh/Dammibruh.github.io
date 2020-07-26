function wombo_combo(){
    for(var i = 0; i < 5000; i++){
        var btn = document.createElement('button');
        btn.innerHTML = 'button';
        var n = document.getElementsByTagName("body")[0];
        n.appendChild(btn);
    };
};
