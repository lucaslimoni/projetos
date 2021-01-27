window.fmTinyMCE = {
  show() {},
  close() {},
  onSelected(item, { editor }) {},
  onClose() {},
};

window.tinyMCE.PluginManager.add('filemanager', function(editor, url) {
  editor.ui.registry.addButton('filemanager', {
    icon: 'duplicate',
    tooltip: 'Inserir arquivos',
    onAction() {
      window.fmTinyMCE.onSelected = function(item, { editor }) {
        if (item.type === 'IMAGE') {
          editor.insertContent(
            `<img style="max-width: 100%; display: block;" src="${item.url}" />`
          );
        } else if (item.type === 'VIDEO') {
          editor.insertContent(
            `<video style="max-width: 100%; display: block;" controls>
              <source src="${item.url}" type="video/mp4">
              Vídeo não é suportado
            </audio>`
          );
        } else if (item.type === 'AUDIO') {
          editor.insertContent(
            `<audio style="max-width: 100%; display: block;" controls>
              <source src="${item.url}" type="audio/mpeg">
              Áudio não é suportado
            </audio>`
          );
        }
        this.close();
      };
      if (window.fmTinyMCE) {
        window.fmTinyMCE.show({ editor });
      }
      return true;
    },
  });
});
