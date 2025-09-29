export type Pastry = {
  id: string;
  name: string;
  type: "cake" | "cookie" | "bread" | "pastry";
  price: number;
  ingredients: string[];
  inStock: boolean;
  description?: string;
};

export type CreatePastryInput = Omit<Pastry, "id">;
export type UpdatePastryInput = Partial<CreatePastryInput>;
