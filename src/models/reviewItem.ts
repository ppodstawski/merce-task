class ReviewItem {
  reviewType: string;
  text: string;
  forItem: string;
  id: string;

  constructor(reviewType: string, forItem: string, reviewText: string) {
    this.reviewType = reviewType;
    this.text = reviewText;
    this.forItem = forItem;
    this.id = new Date().toISOString();
  }
}

export default ReviewItem;
