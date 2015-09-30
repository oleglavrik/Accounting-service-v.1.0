/* JavaScript для enter-form.php */
$(document).ready(function(){
	/* click and blur для форми авторизації */
	function cliker($element){
		$($element).focus(function(){
			window.defaultVal = $(this).val();
			if(this.value == defaultVal)
			{
				this.value = '';
			}
		})
		$($element).blur(function(){
			if(this.value == '')
			{
				this.value = defaultVal;
			}
		})
		
	}
	cliker('.enterText');
	
	$("input[@name='itemSelect[]']:checked").each(function() {selectedItems.push($(this).val());});
});