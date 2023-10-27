chrome.runtime.setUninstallURL('https://forms.gle/RrjQJ5BmxHzmXzrY8');
chrome.contextMenus.create({
    id: "myContextMenu",
    title: "UpperLower | Text converter",
    contexts: ["all"],    
  });
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "option1" || info.menuItemId === "option2" || info.menuItemId === "option3" || info.menuItemId === "option4") {
      // Enviar un mensaje al script de contenido para que realice la operación en el DOM de la página
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function (selectedText, menuItemId) {
          if (selectedText && menuItemId) {
            // Verificar que el elemento sea un INPUT
            const activeElement = document.activeElement;
            if (activeElement.tagName === "INPUT") {
              let newText = "";
  
              // Realizar la operación según la opción del menú
              switch(menuItemId){
                case "option1":
                    newText = selectedText.toLowerCase();
                break;
                case "option2":
                    newText = selectedText.toUpperCase();
                break;
                case "option3":
                    newText = selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase();
                break;
                case "option4":
                    newText = selectedText
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
                break;
              }
              // Reemplazar el texto en el INPUT
              activeElement.value = activeElement.value.substring(0, activeElement.selectionStart) + newText + activeElement.value.substring(activeElement.selectionEnd);
            }
          }
        },
        args: [info.selectionText, info.menuItemId]
      });
    }
  });

  chrome.contextMenus.create({
    id: "option1",
    title: "lowercase",
    contexts: ["all"],
    parentId: "myContextMenu",
  });
  
  chrome.contextMenus.create({
    id: "option2",
    title: "UPPERCASE",
    contexts: ["all"],
    parentId: "myContextMenu",
  });
  
  chrome.contextMenus.create({
    id: "option3",
    title: "Capitalize",
    contexts: ["all"],
    parentId: "myContextMenu",
  });
  
  chrome.contextMenus.create({
    id: "option4",
    title: "Capitalize All",
    contexts: ["all"],
    parentId: "myContextMenu",
  });