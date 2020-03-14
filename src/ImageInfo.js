class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, onClose }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.$imageInfo = $imageInfo;
    this.data = data;
    this.onClose = onClose;

    this.render();
    this.afterRender();
  }

  afterRender() {
    window.addEventListener('click', (e) => {
      const $target = e.target;
      if ($target === this.$imageInfo || $target.id === 'closeImageInfo') {
        this.onClose();
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.onClose();
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close" id="closeImageInfo">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
