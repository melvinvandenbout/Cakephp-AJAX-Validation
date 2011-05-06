/**
 * @file 		ajaxValidation.js
 * @copyright	(c)2011, Best4u Media
 * @author		@MelvinvdBout
 * @return 		Javascript Object
 * @desc 		Javascript class to validate form with AJAX and trought the CAKE MODELS
 */
var ajaxValidation = (function(){
	
	return {
		
		/* 
		 * @method	doPost
		 * @author	@MelvinvdBout
		 * @version	1.0
		 * @desc	this action is called from the view when someone clicks the submit button.
		 */
		doPost: function(settings){
			
			this.settings	= settings;
			
			var _this		= this;
			$.ajax({
				type: "POST",
				url: this.settings.url,
				data: this.settings.element.serialize(),
				success: function(data) {
					
					_this.readResponse(data);
					
				}
			});
		
		},
		
		/*
		 * @method	readResponse
		 * @author	@MelvinvdBout
		 * @version	1.0
		 * @desc	read the AJAX response and decide of there are any errors
		 */
		readResponse: function(data) {
			
			var data	= JSON.parse(data); // parse JSON to object
			
			$('body').find('.error-message').remove();
			
			if(data.error != 1) {
						
				this.settings.callback(data.message);
				
			} else {
				this.addValidation(data);
			}
			
		},
		
		/* 
		 * @method	addValidation
		 * @author	@MelvinvdBout
		 * @version 1.0
		 * @desc	foreach the object and append the error message on the right place
		 */
		addValidation: function(data) {
			
			var _this	= this;
			
			if(data.data) {
			
				$.each(data.data, function(model, fields) { 
					
					if(fields) {
						
						$.each(fields, function(field, message) { 
							
							var inputId	= '#' + _this.camelize(model+'_'+field);
							var element	= $('<div>' + message + '</div>')
											.attr({
												'class' : 'error-message'
											})
											.css ({
												display: 'none'
											});
													
							$(inputId).after(element);
							$(element).fadeIn();
							
						});
					}
					
				});
				
			}

		},
		
		/* @method	camelize
		 * @author	@MelvinvdBout
		 * @version	1.0
		 * @desc	make from the first character and the one after every _ a capital letter
		 */
		camelize: function(string) {
			
        	var a = string.split('_'), i;
        	s = [];
        
        	for (i=0; i<a.length; i++){
            	s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
        	}
        
        	s = s.join('');
        
        	return s;
    
		}
		
	}; 
	
});