	<div id='settings' class="widget">
		<header>
			<h2>Settings</h2>
			<a data-action='close' data-target='settings'>
				<img src="/orkfia/inc/images/toggle.png" width='16' height='16' alt='close'>
			</a>
		</header>
		<div class="content">
			<h3>Game settings</h3>
			<p>
				<label>Username<input type='text' name='username' placeholder='username' pattern='[-A-z0-9_]+' ></label>
			</p>
			<p>
				<label>Password<input type='password' name='password' placeholder='password' ></label>
			</p>
			<h3>Chat settings</h3>
			<p>
				<label>Chat nick<input type='text' name='nick' placeholder='nick' pattern='[-A-z0-9_]+' ></label>
			</p>
			<p>
				<label>Channels to connect<input type='text' name='channels' value='#orkfia' placeholder='#channel,#channel password,#channel'></label>
			</p>
			<p>
				<label>Autojoin<input type='checkbox' name='autoconnect' value='1' ></label>
			</p>
		</div>
	</div>