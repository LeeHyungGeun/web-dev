console.log("app is running!");

const defaultData = {
  searchInput: {},
  searchResult: [],
  imageInfo: {
    visible: false,
    image: null
  }
};

class App {
  $target = null;
  data = Object.assign({}, defaultData);

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => this.setState('searchResult', data));
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.searchResult,
      onClick: image => {
        this.setState('imageInfo', {
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: this.data.imageInfo,
      onClose: () => {
        this.setState('imageInfo', {
          ...this.data.imageInfo,
          visible: false,
        })
      }
    });
  }

  setState(key, nextData) {
    this.data = {
      ...this.data,
      [key]: Array.isArray(nextData) ? [ ...nextData ] : { ...nextData }
    }
    this[key].setState && this[key].setState(this.data[key]);
  }
}
