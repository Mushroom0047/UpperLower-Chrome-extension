let txtArea = document.querySelector(".txt-to-trans");
let buttons = document.querySelector(".sect__buttons");
let replaceText = "";

buttons.addEventListener("click", (e) => {
  e.stopPropagation();

//minusculas
  if (e.target.classList.contains("btn-min")) {
    replaceText = txtArea.value;
    if(replaceText.length > 0){
        let str = replaceText.toLocaleLowerCase();
        txtArea.value = str;
        txtArea.focus();
        txtArea.select();
    }
  }
  //mayusculas
  if (e.target.classList.contains("btn-may")) {
    replaceText = txtArea.value;
        if(replaceText.length > 0){
            let str = replaceText.toLocaleUpperCase();
            txtArea.value = str;
            txtArea.focus();
            txtArea.select();
        }
  }
  if(e.target.classList.contains("btn-clear")){
    txtArea.value = "";
  }
});
