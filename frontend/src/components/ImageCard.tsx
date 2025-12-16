import "./ImageCard.scss";
import { useApp } from "../state/useApp";

export default function ImageCard({
  imageId,
  url,
}: {
  imageId: string;
  url: string;
}) {
  const { state, vote } = useApp();

  const counts = state.counts[imageId] ?? { likes: 0, dislikes: 0 };
  const isVoting = !!state.voting[imageId];

  return (
    <div className="image-card">
      <img
        className="image-card__img"
        src={url}
        alt={`Image ${imageId}`}
        loading="lazy"
      />

      <div className="image-card__body">
        <div className="image-card__actions">
          <button
            className="image-card__btn image-card__btn--like"
            disabled={isVoting}
            onClick={() => void vote(imageId, "LIKE")}
          >
            Like
          </button>

          <button
            className="image-card__btn image-card__btn--dislike"
            disabled={isVoting}
            onClick={() => void vote(imageId, "DISLIKE")}
          >
            Dislike
          </button>
        </div>

        <div className="image-card__meta">
          <div className="image-card__pill">
            <span>Likes</span>
            <strong>{counts.likes}</strong>
          </div>

          <div className="image-card__pill">
            <span>Dislikes</span>
            <strong>{counts.dislikes}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
