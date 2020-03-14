console.log("app is running!");

class App {
  $target = null;
  data = {
    searchInput: {},
    searchResult: [],
    imageInfo: {
      visible: false,
      image: null
    }
  };

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
      data: this.data.imageInfo
    });
  }

  setState(key, nextData) {
    this.data = {
      ...this.data,
      [key]: Array.isArray(nextData) ? [...nextData] : { ...nextData }
    }
    this.searchResult.setState(nextData);
    Object.keys(this.data).forEach((key) => {
      this[key].setState && this[key].setState(this.data[key]);
    });
  }
}
