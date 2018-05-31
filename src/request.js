

const ADDRESS = 'localhost:5000';

export default function getCategories() {
    var categories = [];
    fetch(`http://${ADDRESS}/catalog`)
      .then(results => results.json()).then(data => categories = data.categories);
    console.log("categories");
    console.log(categories);
    return categories;
}
