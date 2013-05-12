<?php
class yaoc {
	private $css = array(),
			$js  = array(),
			$widgets = array();
	public __construct() {
		// Add base CSS
		$this->addCss('css/default.css');
		$this->addCss('css/global.css');
		
		// Add base JS
		$this->addJs('//ajax.googleapis.com/ajax/libs/jquery/1.9/jquery.min.js');
		$this->addJs('js/base.js');
		$this->addJs('js/extra.js');
		$this->addJs('js/jquery-ui-1.9.1.custom.min.js');
		
		// Load all widget controllers
		$this->loadWidgets();
	}
	public function getCss() {
		return $this->css;
	}
	public function addCss($file) {
		$this->css[] = $file;
		return $this;
	}
	public function getJs() {
		return $this->js;
	}
	public function addJs($file) {
		$this->js[] = $file;
		return $this;
	}
	private function loadWidgets() {
		// Read dirs
	}
}