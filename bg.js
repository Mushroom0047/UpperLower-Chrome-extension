// Create context menu items
let menuItems = [
  { id: 'option1', title: 'lower case', contexts: ['selection'] },
  { id: 'option2', title: 'UPPER CASE', contexts: ['selection'] },
  { id: 'option3', title: 'Capitalize', contexts: ['selection'] },
  { id: 'option4', title: 'Capitalize All', contexts: ['selection'] }
];

menuItems.forEach(function (menuItem) {
  chrome.contextMenus.create({
      id: menuItem.id,
      title: menuItem.title,
      contexts: menuItem.contexts
  });
});

// Attach context menu click listener
chrome.contextMenus.onClicked.addListener(modifyText);

function modifyText(info, tab) {
  if (info.menuItemId.startsWith('option')) {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: modifyTextInPage,
          args: [info.selectionText, info.menuItemId]
      });
  }
}

function modifyTextInPage(selectedText, menuItemId) {
  if (selectedText && menuItemId) {
      let newText = '';
      switch (menuItemId) {
          case 'option1':
              newText = selectedText.toLowerCase();
              break;
          case 'option2':
              newText = selectedText.toUpperCase();
              break;
          case 'option3':
              newText = selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase();
              break;
          case 'option4':
              newText = selectedText
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
              break;
      }

      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          try {
              activeElement.value = newText;
          } catch (error) {
              console.error('Error modifying text:', error);
          }
      }
  }
}