	<div id='construction' class="widget">
		<header>
			<h2>Construction helper</h2>
			<a data-action='close' data-target='construction'>
				<img src="/orkfia/inc/images/toggle.png" width='16' height='16' alt='close'>
			</a>
		</header>
		<div class="content">
			<table>
				<thead>
					<tr>
						<th>&nbsp;</th>
						<th>Current</th>
						<th>&nbsp;</th>
						<th>Incom.</th>
						<th>Target</th>
						<th>To build</th>
					</tr>
				</thead>
				<tfoot>
					<tr id="totals">
						<th>Totals</th>
						<th class="current int">0</th>
						<th class="percentage int">-</th>
						<th class="incoming int">0</th>
						<th class="target int">0</th>
						<th class="to_build int">0</th>
					</tr>
				</tfoot>
				<tbody id="construction_data">
<?php
	$buildings = array("Barren","Homes","Farms","Walls","Weaponries","Guilds","Mines","Bastions","Labs","Churches","Guard Houses","Barracks","Hideouts","Academies","Yards");
	foreach ($buildings as $building) {
	echo <<<eod
					<tr>
						<th class="name">{$building}</th>
						<td class="current int">0</td>
						<td class="percentage int">0%</td>
						<td class="incoming int">0</td>
						<!-- waiting for full browser support on step on scroll {min='0' max='100' step='0.1'} -->
						<td><input type='text' size='6' value='0' class="target">%</td>
						<td class="to_build int">0</td>
					</tr>

eod;
	}
?>
				</tbody>
			</table>
			<p>
				parser(construction advisor)<br>
				<textarea cols="20" rows="2"></textarea>
			</p>
		</div>
	</div>