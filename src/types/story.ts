export interface CreateStoryPayload {
  userId: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  category: string; // e.g., "inspirational" | "lost"
  content: string;
}
