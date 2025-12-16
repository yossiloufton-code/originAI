export type ImageItem = { id: string; url: string };

export class ImagesService {
  private readonly count = 100;

  getFixedImages(): ImageItem[] {
    return Array.from({ length: this.count }, (_, i) => {
      const id = String(i + 1);

      // Deterministic + always valid (no missing ids).
      // Same 100 images every time because seed is stable.
      const seed = `picsvoter-${id}`;

      return {
        id,
        url: `https://picsum.photos/seed/${seed}/300/300`,
      };
    });
  }
}
