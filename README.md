# Zazu

This is Zazu, a light ES6 javascript module to create autocomplete inputs. ![travis](https://travis-ci.org/Elhebert/zazu.svg?branch=master)

> It's a small world after all !

![zazu](http://67.media.tumblr.com/30fe1d454295e3ededdb6317b16844ff/tumblr_mg6g4fDShw1r34qiso1_500.gif)

## Usage

Add the **zazu.js** file to your index.(html|php).
```
<script src="/path/to/zazu.js"></script>
```

Add `data-autocomplete` on the html input that need to be autocompleted and `data-ac-result` on the element that'll display the result.

## Options

### highlight
Which HTML tag to use to higlight the query in the results.
default: `strong`

### classHighlight
CSS class for the higlighted element

### surround
Which HTML tag to use to surround the result
default: `li`

### classSurround
CSS class for the surrounding element

Usage:
```
<my-element data-autocomplete></my-element>

<script>
  let myAutocomplete = new Zazu(api, json, {option: ''});
</script>
```

You can use either an API call either a JSON to get the data:
- `api`: Set to null to use a JSON.
- `json`: set to [] to use an api.

## License
This script is published under the [MIT license](./LICENSE)
