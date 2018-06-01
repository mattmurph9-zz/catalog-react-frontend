
const ADDRESS = 'http://localhost:5000';

export const get = url =>
  fetch(ADDRESS + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
  }).then(results => results.json());

export const del = url =>
  fetch(ADDRESS + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
  });

export const post = (url, content) =>
  fetch(ADDRESS + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
    body: content,
  });

export const put = (url, content) =>
  fetch(ADDRESS + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt'),
    },
    body: content,
  });

