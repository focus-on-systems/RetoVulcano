export interface GalleryImage {
  _key: string;
  _type: string;
  alt: string;
  asset: {
    _ref: string;
    _type: string;
    url?: string;
  };
}

export interface ImageGallery {
  Gallery: GalleryImage[];
  _type: string;
}
