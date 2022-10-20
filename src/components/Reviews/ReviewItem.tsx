import classes from './ReviewItem.module.scss';

const ReviewItem: React.FC<{ text: string; onRemoveReview: () => void }> = (props) => {
  return (
    <li className={classes.reviewItem}>
      &#9745; {props.text}
      <button className="buttonHover" onClick={props.onRemoveReview}>
        &#9760;
      </button>
    </li>
  );
};

export default ReviewItem;
