

const ADDRESS = 'localhost:5000';

function getCategories() {
  const url = `http://${ADDRESS}/catalog/`;
  return fetch(url)
    .then(results => results.json()).then(data => data.categories);
}

function addCategory(categoryName) {
  const url = `http://${ADDRESS}/catalog/`;
  console.log(categoryName);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: categoryName,
    }),
  });
}

export default { getCategories, addCategory };
