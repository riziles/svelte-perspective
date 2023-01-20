<script>
	import { onMount } from 'svelte';
	import perspective from '@finos/perspective';

	let table = [];

	let perspectiveSvelte;
	let viewerModule;
	let dataGrid;
	let d3fc;

	onMount(async () => {
		viewerModule = await import('@finos/perspective-viewer');
		dataGrid = await import('@finos/perspective-viewer-datagrid');
		d3fc = await import('@finos/perspective-viewer-d3fc');

		let WORKER = perspective.worker();
		let REQ = fetch('https://api.covidtracking.com/v1/states/daily.csv');

		let LAYOUT = {
			plugin: 'Y Area',
			plugin_config: {
				legend: {
					height: '106px',
					left: '100px',
					top: '25px',
					width: ''
				}
			},
			settings: true,
			group_by: ['Parsed "date" bucket by week'],
			split_by: ['state'],
			columns: ['deathIncrease'],
			filter: [],
			sort: [['deathIncrease', 'col desc']],
			expressions: [
				`// Parsed "date" bucket by week
var year := integer(floor("date" / 10000));
var month := integer(floor("date" / 100)) - year * 100;
var day := integer("date" % 100);
bucket(date(year, month, day), \'W\')`
			],
			aggregates: {}
		};

		// if (!customElements.get('perspective-viewer')) {
		//     customElements.define('perspective-viewer', PerspectiveViewer);
		// };

		const resp = await REQ;
		const csv = await resp.text();
		table = WORKER.table(csv);
		perspectiveSvelte.load(table);
		perspectiveSvelte.restore(LAYOUT);
		perspectiveSvelte.toggleConfig();
	});

	// window.addEventListener("DOMContentLoaded", load);
</script>

<div>
	<perspective-viewer bind:this={perspectiveSvelte} />
</div>

<style>
	perspective-viewer {
		position: absolute;
		top: 100px;
		left: 100px;
		right: 100px;
		bottom: 100px;
	}
</style>
