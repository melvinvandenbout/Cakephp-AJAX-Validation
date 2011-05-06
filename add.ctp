
<?php echo $this->Form->create('Model', array('id'=>'addModel')); ?>
<?php echo $this->Form->input('Model.title'); ?>
<?php echo $this->Form->input('Model.content', array('type'=>'textarea')); ?>
<?php echo $this->Form->end(__('Add model', true), array('id'=>'submit')); ?>

<?php echo $this->Javascript->link('ajaxValidation'); ?>

<script type="text/javascript">

$(document).ready(function(){

	var formId		= '#addModel';	// id of your form <form id=""
	var button		= '#submit';	// id of your submit <input id="" type="submit"
	var validate	= ajaxValidation();

	$(formId).submit(function(){

		var	url		= $(formId).attr('action');
		var element	= $(formId);
		
		validate.doPost({
			url: url,
			element: element,
			callback: function(message) {
				alert('your callback when everything is okey!: ' + message + '');
			}
		});
		
		return false; // prevent the browser from submitting the form the normal way
	});

});
</script>