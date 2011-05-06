<?php

	
	function add(){
		
		if(isset($this->data) && $this->RequestHandler->isAjax()) {
	
			configure::write('debug', 0);
			$this->layout 		= 'ajax';  	// uses an empty layout
			$this->autoRender 	= false; 	// renders nothing by default
			
			$this->Model->create();
	
			if($this->Model->saveAll($this->data)) {
				
				$response	= array(
					'error'		=> 0,
					'message'	=> 'Succes'
				);
				
				return json_encode($response);
				
			} else {
				
				$response	= array(
					'error'		=> 1,
					'message'	=> 'failure'
				);
				
			}
	
			
			$response['data']['Model']	= $this->Model->invalidFields();
			return json_encode($response);
			
		}
		
	}
