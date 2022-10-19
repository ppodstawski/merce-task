const ReviewItem: React.FC<{ text: string; onRemoveReview: () => void }> = (props) => {
  return <li onClick={props.onRemoveReview}>{props.text}</li>;
};

export default ReviewItem;
