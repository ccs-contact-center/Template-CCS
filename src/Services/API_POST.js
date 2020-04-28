const BASEURL = "https://api.ccscontactcenter.com/Test";

export const apiGetPosts = () => {
  const url = BASEURL + "/post";

  return fetch(url).then(response => response.json());
};

export const apiAddPost = post => {
  const url = BASEURL + "/post/";

  const request = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  return fetch(url, request).then(response => response.json());
};

export const apiUpdatePost = (id, post) => {
  const url = BASEURL + "/post/" + id;

  const request = {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  return fetch(url, request).then(response => response.json());
};

export const apiDeletePost = id => {
  const url = BASEURL + "/post/" + id;

  const request = { method: "DELETE" };

  return fetch(url, request).then(response => response.json());
};
