import {Vue} from 'vue-class-component';
import axios from 'axios';

export default class HeaderOrganism extends Vue {

	searchText: string = '';
	result: Array<Object> = [];
	direction: string = '';
	private apiKey = 'I98w863exphO5VkevR8IAAXGZZCcY3Cn';
	resultNumbers: number = 0;
	row: boolean = true;
	searchBar: boolean = true;
	placeholder: string = 'Gif search...';
	searchButtonText: string = 'Go!';
	imgStyle: string = 'padding-top: 10px; margin: 0 10px; cursor: pointer';
	height: number = 256;
	width: number = 256;
	offset: number = 0;
	isLoadGifs: boolean = true;

	private searchGifsTimeout: any;

	mounted() {
		this.direction = 'flex-direction:  ' + (this.row ? 'row' : 'column') + ';';

	}

	created() {
		window.addEventListener('scroll', this.handleScroll);
		this.getGifs('trending');
	}

	searchGifs() {
		if (this.searchGifsTimeout) {
			clearTimeout(this.searchGifsTimeout);
		}

		this.searchGifsTimeout = setTimeout(() => {
			this.offset = 0;
			this.getGifs('search');
		}, 3000);
	};

	getGifs(typeUrl: string) {
		if (!this.isLoadGifs) {
			return;
		}
		this.isLoadGifs = false;
		if (this.offset === 0) {
			this.result = [];
		}
		axios.get(
			`https://api.giphy.com/v1/gifs/${typeUrl}?api_key=${this.apiKey}&bundle=messaging_non_clips&limit=25&rating=g&offset=${this.offset}&q=${this.searchText}&lang=en`
		).then((response) => {
			this.renderResult(response);
			this.isLoadGifs = true;
		});
	}

	renderResult(response: any) {
		let count = 0;
		for (let el of response.data.data) {
			let images = el.images;
			this.result.push({url: images.original.url, height: images.fixed_height.height, width: images.fixed_height.width});
			if ((count += 1) >= this.resultNumbers) break;
		}
	}

	handleScroll() {
		const height = document.body.offsetHeight;
		const screenHeight = window.innerHeight;

		const scrolled = window.scrollY;

		const threshold = height - screenHeight / 4;

		const position = scrolled + screenHeight;

		if (position >= threshold) {
			let typeUrl = this.searchText ? 'search' : 'trending';
			this.offset += 25;
			this.getGifs(typeUrl);
		}
	}
}