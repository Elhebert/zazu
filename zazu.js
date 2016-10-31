{
  class Zazu {

    constructor (api = null, data = [], options = {}) {
      this.jsonData = data;
      this.api = api;

      /*
       * Possible options are:
       * - higlight (default: strong): which HTML tag to use to higlight the query
       * - classHighlight (default: ''): Css class for the higlighted element
       * - surround (default: li): which HTML tag to use to surround the result
       * - classSurround (default: ''): Css class for the surrounding element
       */
      let defaults = {
        highlight: 'strong',
        classHighlight: '',
        surround: 'li',
        classSurround: '',
      };

      this.options = this.setOptions(defaults, options);
    }

    makeAutoComplete (element) {
      Zazu.getData();
      let resultElement = document.querySelector('[data-ac-results]');

      if (!resultElement) {
        resultElement = document.createElement('div');
        element.parentNode.insertBefore(resultElement, element.nextSibling);
      }

      let onInput = () => {
        let inputValue = event.target.value;
        let regexp = new RegExp('^(.*)(' + inputValue + ')(.*)$', 'igm');

        this.jsonData.forEach(element => {
          let match = element.match(regexp, element);

          if (match) {
            let styledElement =
              `${match[1]}<${this.options.highlight} class="${this.options.classHighlight}">
                ${match[2]}
              </${this.options.highlight}>${match[3]}`;
            resultElement.insertAdjacentHTML('beforeend',
              `<${this.options.surround} class="${this.options.classSurround}">
                ${styledElement}
              </${this.options.surround}>`);
          }
        });
      };

      element.addEventListener('input', onInput);
    }

    getData () {
      if (this.api) {
        let request = new XMLHttpRequest();

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status === 200)
              this.jsonData.push(JSON.parse(request.response));
          }
        };

        request.open('Get', this.api);
      }
    }

    setOptions(defaults, properties) {
      for (let property in properties) {
        if (properties.hasOwnProperty(property)) {
          defaults[property] = properties[property];
        }
      }

      return defaults;
    }
  }

  /**
   * Make every element with the [data-autocomplete] attribute an auto-complete input.
   */
  let myAutocomplete = new Zazu('test-api-url');

  let elements = document.querySelectorAll('[data-autocomplete]');
  for (let key in elements) {
    if (elements.hasOwnProperty(key))
      myAutocomplete.makeAutoComplete(elements[key]);
  }
}
