let txtArea = document.querySelector(".txt-to-trans");
const buttons = document.querySelector(".sect__buttons");
const version = document.querySelector(".version");
let charCount = document.getElementById('charCount');

let replaceText = "";

version.textContent = 'v1.4.4'

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
        copyText(e);
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
            copyText(e);
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
        copyText(e);
    }
  }
  //Capitalize All
  if(e.target.classList.contains("btn-capAll")){
    replaceText = txtArea.value.toLowerCase();
    const words = replaceText.split(' ');
    const capitalizeWords = words.map(word => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      } else {
        return '';
      }
    });
    const res = capitalizeWords.join(' ');
    txtArea.value = res;
    txtArea.focus();
    txtArea.select();
    copyText(e);
  }


  //Clear
  if(e.target.classList.contains("btn-clear")){
    txtArea.value = "";
  }

});


function copyText(e){
  try {
    document.execCommand("copy");
    let txt = e.target.textContent;
    let originalImage = e.target.querySelector('.button-icon').outerHTML;

    e.target.textContent = "Copied !";
    setTimeout(function() {
      e.target.innerHTML = originalImage + txt;
    }, 2000); // 2 segundos
  } catch (err) {
    console.error("No se pudo copiar el texto al portapapeles: ", err);
  }
}

//Counter characters
txtArea.addEventListener('input', () => {
    charCount.textContent = txtArea.value.length;
});