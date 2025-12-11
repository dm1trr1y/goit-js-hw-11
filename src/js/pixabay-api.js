import axios from "axios";

export default function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: "53656110-41a2fc396959a6e939ebdf929",
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 9,
  });

  return axios
    .get(`https://pixabay.com/api/?${searchParams}`)
    .then((response) => response.data.hits)
    .catch((error) => error);
}
