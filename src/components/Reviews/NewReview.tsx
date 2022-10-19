import { useRef, useContext } from 'react';
import { ReviewContext } from '../../store/reviews-context';

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
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Review text</label>
      <input type="text" id="text" ref={reviewTextInputRef} />
      <button>Add Review</button>
    </form>
  );
};

export default NewReview;
