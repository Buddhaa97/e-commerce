import { useRouter } from 'next/router';

const Review = () => {
    const router = useRouter();
    const { reviewId, productId } = router.query;
    return <h2>review id {reviewId} of product Id {productId}</h2>
}

export default Review;
