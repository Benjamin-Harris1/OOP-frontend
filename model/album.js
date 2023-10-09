export default class Album {
  constructor(obj) {
    this.title = obj.title;
    this.release_date = obj.release_date;
    this.tracks = [];
  }
  addTrack(track) {
    this.tracks.push(track);
  }
}
