(function(window, document, undefined) {

  var category = [],
    datalist = [];

  function rand(min, max) {
    var argc = arguments.length;
    if (argc === 0) {
      min = 0;
      max = 2147483647;
    } else if (argc === 1) {
      throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
    } else {
      min = parseInt(min, 10);
      max = parseInt(max, 10);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getTemplate(data) {
    var output = [],
      tpl = '<h1>Hello World</h1>';
    output.push(tpl);
    data.forEach(function(val) {
      tpl = '<div>';
      tpl += '<figure>';
      tpl += '<img src="img/' + val.img + '" alt="' + val.name + '">';
      tpl += '<figcaption><a href="' + val.url + '" target="_blank">' + val.name + '</a></figcaption>';
      tpl += '<p>' + val.intro + '</p>';
      tpl += '</figure>';
      tpl += '</div>';
      output.push(tpl);
    });
    return output.join('');
  }

  function render(data) {
    document.getElementById('dev').innerHTML = getTemplate(data);
  }

  function ajaxSuccess(response) {
    for (var key in response) {
      category.push(key);
      datalist.push(response[key]);
    }
    render(datalist[rand(1, category.length) - 1]);
  }

  function getJSON() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        ajaxSuccess(JSON.parse(xhr.responseText));
      }
    };
    xhr.open('get', 'data.json', true);
    xhr.send(null);
  }

  function init() {
    getJSON();
  }

  init();

})(window, document);
