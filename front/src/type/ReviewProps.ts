export interface Review {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ReviewListProps {
  movieId: string;
  reviewsUpdated: boolean;
}