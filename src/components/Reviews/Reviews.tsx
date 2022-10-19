import { useContext } from 'react';
import { ReviewContext } from '../../store/reviews-context';
import NewReview from './NewReview';
import ReviewItem from './ReviewItem';

const Reviews: React.FC<{ forItem: string; type: string }> = (props) => {
  const reviewCtx = useContext(ReviewContext);

  return (
    <>
      <h3>Recenzje</h3>
      <ul>
        {reviewCtx.items
          .filter((item) => item.reviewType === props.type)
          .filter((item) => item.forItem === props.forItem)
          .map((item) => (
            <ReviewItem key={item.id} text={item.text} onRemoveReview={reviewCtx.removeReview.bind(null, item.id)} />
          ))}
      </ul>
      <NewReview forItem={props.forItem} type={props.type} />
    </>
  );
};

export default Reviews;
