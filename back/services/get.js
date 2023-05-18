function getNine(data, page) {
  const output = {
    data: data.slice((page - 1) * 9, page * 9),
    next: data.length > page * 9,
  };
  return output;
}

async function getData(category) {
  let url = `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${
    category || ''
  }`;
  return await fetch(url)
    .then((res) => {
      if (res.status !== 200) throw { code: res.status, text: res.statusText };
      return res.json();
    })
    .then((data) => data.hits);
}

function sortId(data, order) {
  return data.sort((a, b) => {
    return order === 'asc' ? a.id - b.id : b.id - a.id;
  });
}

module.exports = { getNine, getData, sortId };