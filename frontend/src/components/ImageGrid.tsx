import ImageCard from "./ImageCard";
import { useApp } from "../state/useApp";
import "./ImageGrid.scss";

export default function ImageGrid() {
  const { state } = useApp();

  return (
    <div className="image-grid">
      {state.images.map((img) => (
        <ImageCard key={img.id} imageId={img.id} url={img.url} />
      ))}
    </div>
  );
}
