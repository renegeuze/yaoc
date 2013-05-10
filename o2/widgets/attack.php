	<div id='attack' class="widget">
		<header>
			<h2>Attack calculator</h2>
			<a data-action='close' data-target='attack'>
				<img src="/orkfia/inc/images/toggle.png" width=16 height=16 alt='close'>
			</a>
		</header>
		<div class="content">
			<table id="attacker">
			<tbody>
				<tr>
					<td colspan="2"><h2>Attacker</h2></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<th>Raw offense</th>
					<th id="rawOff">0</th>
				</tr>
				<tr>
					<td colspan="2"><hr/></td>
				</tr>
				<tr>
					<td>Ciorin's blessing (<span class="cb" contenteditable="true">15</span>%)</td>
					<td><input type="checkbox" id="cb" onclick="calc()" checked="checked"/></td>
				</tr>
				<tr>
					<td>Mortality (<span class="mort" contenteditable="true">5</span>%)</td>
					<td><input type="checkbox" id="mort" onclick="calc()"/></td>
				</tr>
				<tr>
					<td>Pestilence (<span class="pest" contenteditable="true">5</span>%)</td>
					<td><input type="checkbox" id="pest" onclick="calc()"/></td>
				</tr>
				<tr>
					<td>Both generals (<span class="general" contenteditable="true">10</span>%)</td>
					<td><input type="checkbox" id="general" onclick="calc()"/></td>
				</tr>
				<tr>
					<td>Fame</td>
					<td><input type="text" size="9" value="0" class="fame" onkeyup="calc()" onclick="this.select()" /></td>
				</tr>
				<tr>
					<td>Weaponries</td>
					<td><input type="text" size="9" value="0" class="weaponries" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Combat science</td>
					<td><input type="text" size="9" value="0" class="combat" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Total land</td>
					<td><input type="text" size="9" value="0" class="acres" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<th>Modded offense</th>
					<th id="modOff">0</th>
				</tr>
				<tr>
					<td colspan="2"><hr/></td>
				</tr>
				<tr>
					<td colspan="2">
						parser(military/construction advisor pages)<br/>
						<textarea name="parser" cols="20" rows="2" onkeyup="parsefield('attacker',this)"></textarea>
					</td>
				</tr>
				</tbody>
			</table>
			<table id="outcome">
				<tbody>
				<tr>
					<td colspan="2"><h2>Outcome</h2></td>
				</tr>
				<tr>
					<td>Attack type</td>
					<td>
						<select id="attacktype" onchange="calc()">
							<option selected value="standard">Standard Attack</option>
							<option value="raid">Raid</option>
							<option value="barren">Barren Grab</option>
							<option value="hnr">Hit 'n' Run</option>
							<option value="crusade">Blasphemy Crusade</option>
							<option value="raze">Raze</option>
							<option value="commandeer">Commandeer</option>
							<option value="pillage">Pillage</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Defender in war with</td>
					<td >
						<select id="war" onchange="calc()">
							<option selected value="none">Nobody</option>
							<option value="attacker">Attacker</option>
							<option value="third">Third party</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>Outcome</th>
					<th><span id="winner">unkown</span> (<span id="percentage">0</span>%)</th>
				</tr>
				<tr>
					<td>Land conquered</td>
					<td><span id="gain">0</span> acres</td>
				</tr>
				<tr>
					<td>Land explored</td>
					<td><span id="explored">0</span> acres</td>
				</tr>
				<tr>
					<th>Total won</th>
					<th><span id="total">0</span> acres</th>
				</tr>
				</tbody>
			</table>
			
			<table id="defender">
				<tbody>
				<tr>
					<td colspan="2"><h2>Defender</h2></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<td><span class="name">unknown</span> (<span class="off" contenteditable="true">0</span>/<span class="def" contenteditable="true">0</span>)</td>
					<td><input type="text" size="9" value="0" onkeyup="calc()" onclick="this.select()" class="amount" /></td>
				</tr>
				<tr>
					<th>Raw defense</th>
					<th id="rawDef">0</th>
				</tr>
				<tr>
					<td colspan="2"><hr/></td>
				</tr>
				<tr>
					<td>Deam's Hunt (<span class="dh" contenteditable="true">10</span>%)</td>
					<td><input type="checkbox" id="dh" onclick="calc()" checked="checked"/></td>
				</tr>
				<tr>
					<td>Deep Forest (<span class="df" contenteditable="true">5</span>%)</td>
					<td><input type="checkbox" id="df" onclick="calc()"/></td>
				</tr>
				<tr>
					<td>Walls</td>
					<td><input type="text" size="9" value="0" class="walls" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Combat science</td>
					<td><input type="text" size="9" value="0" class="combat" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Total acres</td>
					<td><input type="text" size="9" value="0" class="acres" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Barren acres</td>
					<td><input type="text" size="9" value="0" class="barren" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<td>Incoming acres</td>
					<td><input type="text" size="9" value="0" class="incoming" onkeyup="calc();" onclick="this.select()"/></td>
				</tr>
				<tr>
					<th>Modded defense</th>
					<th id="modDef">0</th>
				</tr>
				<tr>
					<td colspan="2"><hr/></td>
				</tr>
				<tr>
					<td colspan="2">
						parser(sneak/intercept/recon)<br/>
						<textarea name="parser" cols="20" rows="2" onkeyup="parsefield('defender',this);"></textarea>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>