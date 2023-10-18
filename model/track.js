export default class Track {
  constructor(obj) {
    this.title = obj.title;
    this.duration = obj.duration;
    // this.artists = [];
  }
  addArtist(artist) {
    this.artists.push(artist);
  }
}
