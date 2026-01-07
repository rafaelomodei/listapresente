export type GiftReservation = {
  name: string;
  phone: string;
};

export type GiftItem = {
  id: string;
  name: string;
  category: string;
  reservedBy?: GiftReservation;
};

export type Category = {
  name: string;
  items: string[];
};
