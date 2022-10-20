import React, { PropsWithChildren, useEffect, useState } from 'react';

import ReviewItem from '../models/reviewItem';

type ReviewContextObj = {
  items: ReviewItem[];
  addReview: (type: string, forItem: string, text: string) => void;
  removeReview: (id: string) => void;
};

export const ReviewContext = React.createContext<ReviewContextObj>({
  items: [],
  addReview: () => {},
  removeReview: (id: string) => {}
});

const ReviewContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [review, setReview] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('reviews');
    console.log(storage);
    if (storage) {
      const parsedReviews = JSON.parse(storage) as ReviewItem[];
      setReview(parsedReviews);
    }
  }, []);

  const addReviewHandler = (reviewType: string, forItem: string, reviewText: string) => {
    const newReview = new ReviewItem(reviewType, forItem, reviewText);

    console.log(newReview);
    setReview((prevReview) => {
      return prevReview.concat(newReview);
    });

    const storage = localStorage.getItem('reviews');
    if (storage) {
      const parsedReviews = JSON.parse(storage) as ReviewItem[];
      parsedReviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(parsedReviews));
    } else {
      localStorage.setItem('reviews', JSON.stringify([newReview]));
    }
  };

  const removeReviewHandler = (reviewId: string) => {
    const storage = localStorage.getItem('reviews');
    if (storage) {
      const parsedReviews = JSON.parse(storage) as ReviewItem[];
      const arrAfterDelete = parsedReviews.filter((item) => item.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(arrAfterDelete));
    }

    setReview((prevReview) => {
      return prevReview.filter((review) => review.id !== reviewId);
    });
  };

  const contextValue: ReviewContextObj = {
    items: review,
    addReview: addReviewHandler,
    removeReview: removeReviewHandler
  };

  return <ReviewContext.Provider value={contextValue}>{props.children}</ReviewContext.Provider>;
};

export default ReviewContextProvider;
