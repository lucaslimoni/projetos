window.fmTinyMCEBackground = {
  show() {},
  close() {},
  onSelected(item, { editor }) {},
  onClose() {},
  error(item, message) {},
};

window.tinyMCE.PluginManager.add('backgroundManager', function(editor, url) {
  editor.ui.registry.addButton('backgroundManager', {
    icon: 'embed-page',
    tooltip: 'Inserir/Alterar background',
    onAction() {
      window.fmTinyMCEBackground.onSelected = function(item, { editor }) {
        if (item.type === 'IMAGE') {
          const root = editor.dom.getRoot();
          const first = root.firstChild;
          if (first.classList.contains('editorBackgroundCover')) {
            first.style.backgroundImage = `url(${item.url})`;
          } else {
            const container = `<div class='editorBackgroundCover' style='background-size: cover; background-repeat: no-repeat; background-image: url(${item.url})'>${root.innerHTML}</div>`;
            root.innerHTML = container;
          }
          this.close();
        }
        if (item.type === 'VIDEO' || item.type === 'AUDIO') {
          this.error(item.type);
        }
      };
      if (window.fmTinyMCEBackground) {
        window.fmTinyMCEBackground.show({ editor });
      }
      return true;
    },
  });
});
