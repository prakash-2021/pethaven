export interface CreateStoryPayload {
  userId: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  category: string; // e.g., "inspirational" | "lost"
  content: string;
}

export interface Story {
  id: string;
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  createdAt: string; // ISO string format
  updatedAt: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
