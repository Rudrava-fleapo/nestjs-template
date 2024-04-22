interface Tag {
  name: string;
  description?: string;
}

const auth: Tag = {
  name: 'Auth',
};
const user: Tag = {
  name: 'User',
};
const restaurant: Tag = {
  name: 'Restaurants',
};

const places: Tag = {
  name: 'Places',
};

const assets: Tag = {
  name: 'Assets',
};

export const tags = {
  auth,
  user,
  restaurant,
  places,
  assets,
};
