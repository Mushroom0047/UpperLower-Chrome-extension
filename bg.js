chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "option1" || info.menuItemId === "option2" || info.menuItemId === "option3" || info.menuItemId === "option4") {
    // Enviar un mensaje al script de contenido para que realice la operación en el DOM de la página
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function (selectedText, menuItemId) {
        if (selectedText && menuItemId) {
          // Obtener el elemento activo
          const activeElement = document.activeElement;

          if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
            // Copiar el valor del elemento activo
            const textToCopy = activeElement.value;

            // Realizar la operación según la opción del menú
            let newText = "";
            switch(menuItemId){
              case "option1":
                  newText = textToCopy.toLowerCase();
                break;
              case "option2":
                  newText = textToCopy.toUpperCase();
                break;
              case "option3":
                  newText = textToCopy.charAt(0).toUpperCase() + textToCopy.slice(1).toLowerCase();
                break;
              case "option4":
                  newText = textToCopy
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
                break;
            }

            // Pegar el texto modificado en el elemento activo
            activeElement.value = newText;

            // Disparar un evento `input` para notificar los cambios
            const inputEvent = new Event('input', {
              bubbles: true,
              cancelable: true,
            });
            activeElement.dispatchEvent(inputEvent);

            // Guardar el valor modificado en el Portapapeles
            activeElement.select();
            document.execCommand("copy");
          }
        }
      },
      args: [info.selectionText, info.menuItemId]
    });
  }
});
