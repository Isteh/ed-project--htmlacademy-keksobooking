const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Set prewiew img file

const setFileChooserHandler = (
  fileChooser,
  preview,
  cb,
  isMultiply = false
) => {
  const previewTemplate = preview.cloneNode();
  const previewParrent = preview.parentElement;
  let previewNewElement;
  // Если инпут вбирает в себя только один файл, то объявляем его вне цикла, чтобы изменять одну и ту же сущность, не добавляя новые
  if (!isMultiply) {
    previewNewElement = previewTemplate.cloneNode();
  }

  fileChooser.addEventListener('change', () => {
    const imgsFragment = document.createDocumentFragment();

    Array.from(fileChooser.files).forEach((file) => {
      if (isMultiply) {
        previewNewElement = previewTemplate.cloneNode();
      }
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

      if (matches) {
        preview.style.display = 'none';
        cb(previewNewElement, file);
        imgsFragment.append(previewNewElement);
      }
    });
    previewParrent.append(imgsFragment);
  });
};

const clearPreviewImgs = (preview) => {
  const items = preview.parentElement.children;

  if (items.length > 0) {
    while (1 < items.length) {
      items.item(1).remove();
    }
    preview.style.display = 'block';
  }
};

export { setFileChooserHandler, clearPreviewImgs };
