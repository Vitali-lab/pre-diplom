const initialAppState = {
  id: null,
  title: null,
  price: null,
  imageUrl: null,
  description: null,
  createdAt: null,
  reviews: [
    //   { id, author, content, rating, publishedAt }
  ],
};

export const productReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "SET_PRODUCT": {
      return state;
    }

    default:
      return state;
  }
};
