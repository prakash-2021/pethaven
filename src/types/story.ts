export interface CreateStoryPayload {
  userId: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  category: string; // e.g., "inspirational" | "lost"
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface Story {
  id: string;
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  createdAt: string; // ISO string format
  status: string;
  updatedAt: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
