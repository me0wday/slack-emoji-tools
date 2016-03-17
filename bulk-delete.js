$('tr:first').each(function() {
    $(this).prepend('<th>Remove</th>');
});
$('#custom_emoji tr:not(:first)').each(function() {
    console.log($(this).find('td').first().text());
    $(this).prepend('<td class="align_middle"><input id="remove_bulk" type="checkbox" name="remove" value="' + $(this).find('td:eq(1)').text().replace(/\s+/g, "").replace(/\:/g, '') + '"></td>');
});
$('#list_emoji_section h4').append('<p><input id="bulk_button" type="submit" class="btn btn_danger" value="Remove selected"></p>');

$("#bulk_button").click(function(){
var count = 0;
$(this).prop('value', 'Working...');
$("#remove_bulk:checked").each(function() {
	console.log($(this).attr('value').replace(/\:/g, ''));
	var $emoji = $(this).attr('value').replace(/\:/g, '');
	var $form = $(this).parent().parent().find('td').last().find('form').first();
	console.log("form: " + $form);
	//$form.submit()


	var dataString = $form.serialize();
            $.ajax({
                type: "POST",
                url: "/customize/emoji",
                data: dataString,
                success: function(msg) {
                    $("#bulk_button").prop('value', "Removing: " + $emoji);  
                    console.log('working: ');
                    count = count + 1;
                },
                error: function(msg) {
                    $("#bulk_button").text("not working ");  
                    console.log('not working ');
                }
            });


});

setTimeout(
  function() 
  {
    if (count = $("#remove_bulk:checked").length) {
	location.reload();
    	console.log('finished');
    }
  }, 5000);


});
