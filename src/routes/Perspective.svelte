<script>
	import perspective from '@finos/perspective';
	import '@finos/perspective-viewer/dist/css/themes.css';

	let perspectiveSvelte = $state();

	const LAYOUT = {
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

	$effect(() => {
		const viewer = perspectiveSvelte;
		if (!viewer) return;

		let cancelled = false;

		async function init() {
			await import('@finos/perspective-viewer-datagrid');
			await import('@finos/perspective-viewer-d3fc');
			await import('@finos/perspective-viewer');

			if (cancelled) return;

			const plugin = await viewer.getPlugin('Y Area');
			plugin.max_cells = 10000000;
			plugin.max_columns = 10000000;

			const WORKER = perspective.worker();
			const resp = await fetch('https://api.covidtracking.com/v1/states/daily.csv');
			const csv = await resp.text();
			const table = WORKER.table(csv);
			viewer.load(table);
			viewer.restore(LAYOUT);
			viewer.toggleConfig();
		}

		init();

		return () => {
			cancelled = true;
		};
	});
</script>

<div>
	<perspective-viewer bind:this={perspectiveSvelte}></perspective-viewer>
</div>

<style>
	perspective-viewer {
		position: absolute;
		top: 100px;
		left: 100px;
		right: 100px;
		bottom: 100px;
	}

@media screen and (max-width: 990px) {
	perspective-viewer {
		top: 50px;
		left: 0px;
		right: 0px;
		bottom: 0px;
  }
}


</style>
