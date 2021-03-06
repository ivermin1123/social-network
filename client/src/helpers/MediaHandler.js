class MediaHandler {
	constructor() {
		this.stream = null;
	}

	getPremissions() {
		return new Promise((resolve) => {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					this.stream = stream;
					resolve(stream);
				})
				.catch((err) => {
					throw new Error(`Unable to fetch stream ${err}`);
				});
		});
	}

	stopRecoring() {
		this.stream.getTracks().forEach((track) => {
			track.stop();
		});
	}
}

export default MediaHandler;
