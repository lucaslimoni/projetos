window.tinyMCE.PluginManager.add('maxchars', function(editor) {
  //set a default value for the maxChars peroperty
  editor.maxChars = editor.maxChars || 5000;

  function init() {
    //add a custom style which will be injected into the iframe
    updateStyle(); //check if the initial content is valid
  }

  function updateStyle() {
    var content = editor.getContent({
      format: 'text',
    });

    var $editorId = editor.id * 1 - 1;
    var $body = document.getElementById('contadorCaracteres_' + $editorId);
    var content2 = editor.getContent();

    if (content.length > editor.maxChars) {
      alert(`Limite de ${editor.maxChars} caractéres atingido`);
      editor.setContent(content.slice(0, editor.maxChars));
      $body.innerText =
        editor.maxChars - content.length + ' caracteres restantes';
    } else {
      $body.innerText =
        editor.maxChars - content.length + ' caracteres restantes';
    }
  }
  editor.on('init', init);
  editor.on('change keyUp', updateStyle);
});
