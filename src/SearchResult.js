let hasSearched = false;

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data.cats && this.data.cats.length > 0 ? this.data.cats
      .map(
        cat => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
      )
      .join("") : `
          <div class="notfound-wrap ${hasSearched ? '' : 'hide'}">
            <div class="notfound">
              <span>${ this.data.isSearching ? '검색중입니다.' : '검색 결과가 없습니다.'}</span>
            </div>
          </div>
        `

    hasSearched = true;

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data.cats[index]);
      });
    });
  }
}
