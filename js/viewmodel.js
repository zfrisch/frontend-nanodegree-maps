var viewModel = function(name) {
  this.name = ko.observable(name);
  this.name.subscribe(function(name) {
    document.getElementById('results').textContent = '';
    checkList(name);
  });
}

function loadArray() {
  var listText = [];
  var list = [].slice.call(document.getElementsByTagName('li'));
  list.forEach(function(item, index) {
    listText.push(item.textContent);
  });
  return listText;
}

function checkList(x) {
  x = x.toUpperCase();
  var lister = [].slice.call(document.getElementsByTagName('li'));
  lister.forEach(function(item, index) {
    item.classList.remove('hidden');
  });
  var textArr = loadArray();

  textArr.forEach(function(item, index) {

    if (item.toUpperCase().indexOf(x) == -1) {
      document.getElementsByTagName('li')[index].classList.add('hidden');
    }
    if (x == '') {
      var lister = [].slice.call(document.getElementsByTagName('li'));
      lister.forEach(function(item, index) {
        item.classList.remove('hidden');
      });
    }
  });
  if (document.querySelectorAll('li.hidden').length == textArr.length) {
    document.getElementById('results').textContent = "no results found";
  } else {
    document.getElementById('results').textContent = document.querySelectorAll('li:not([class*="hidden"]').length + ' Results';
  }
}

ko.applyBindings(new viewModel(''));