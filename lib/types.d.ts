type MemberType = {
  id: string;
  name: string;
  email: string;
  image: string;
  member: {
    id: number;
    name: string;
    // Other properties...
  };
};

type GroupType = {
  id: string;
  name: string;
  price: number;
  members?: MemberType[];
  tags: [string];
};
