let txtArea = document.querySelector(".txt-to-trans");
let buttons = document.querySelector(".sect__buttons");
let replaceText = "";

buttons.addEventListener("click", (e) => {
  e.stopPropagation();

//minusculas
  if (e.target.classList.contains("btn-min")) {
    replaceText = txtArea.value;
    if(replaceText.length > 0){
        let str = replaceText.toLowerCase();
        txtArea.value = str;
        txtArea.focus();
        txtArea.select();
    }
  }
  //mayusculas
  if (e.target.classList.contains("btn-may")) {
    replaceText = txtArea.value;
        if(replaceText.length > 0){
            let str = replaceText.toUpperCase();
            txtArea.value = str;
            txtArea.focus();
            txtArea.select();
        }
  }

  //Capitalize
  if(e.target.classList.contains("btn-cap")){
    replaceText = txtArea.value;
    if(replaceText.length > 0){
        let strLow = replaceText.toLowerCase();
        let str = strLow[0].toUpperCase()+strLow.slice(1);
        txtArea.value = str;
        txtArea.focus();
        txtArea.select();
    }
  }

  //Clear
  if(e.target.classList.contains("btn-clear")){
    txtArea.value = "";
  }

});
