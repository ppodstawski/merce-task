import { useRef, useContext } from 'react';
import { ReviewContext } from '../../store/reviews-context';
import classes from './NewReview.module.scss';

const NewReview: React.FC<{ forItem: string; type: string }> = (props) => {
  const reviewCtx = useContext(ReviewContext);

  const reviewTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = reviewTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    reviewCtx.addReview(props.type, props.forItem, enteredText);
    reviewTextInputRef.current!.value = '';
  };

  return (
    <form className={classes.newReview} onSubmit={submitHandler}>
      <label htmlFor="text">Twoja recenzja:</label>
      <input type="text" id="text" ref={reviewTextInputRef} />
      <button>Dodaj!</button>
    </form>
  );
};

export default NewReview;
