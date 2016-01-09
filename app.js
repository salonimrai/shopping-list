function addListItem(listItemName){
	var newListItem = '<li class=\"shoppinglist-item-container incomplete\"><ul class=\"shoppinglist-item\"><li class=\"shoppinglist-item-left\"><i class=\"fa fa-circle-o fa-2x\"></i></li><li class=\"shoppinglist-item-content\"><div class=\"shoppinglist-item-name\">Item text 1</div><div class=\"shoppinglist-item-search\">Click to search:<a href=\"http://www.amazon.com\"><i class=\"fa fa-amazon\"></i></a> <a href=\"http://www.google.com\"><i class=\"fa fa-google\"></i></a></div></li><li class=\"shoppinglist-item-right\"><i class=\"fa fa-trash-o fa-2x\"></i></li></ul></li>'

	var searchListItemName = listItemName.trim().replace(/\s+/g,'+');

	$('#shoppinglist-ul').append(newListItem);
	$('.shoppinglist-item-container:last-child .shoppinglist-item-name').text(listItemName);
	$('.shoppinglist-item-container:last-child .shoppinglist-item-search a:first-child').attr('href','http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords='+searchListItemName);
	$('.shoppinglist-item-container:last-child .shoppinglist-item-search a:last-child').attr('href','http://www.google.com/?gws_rd=ssl#q='+searchListItemName);	 
}

function completeListItem(listItem) {
	var parentComplete = listItem.parents('.shoppinglist-item-container');
	var fontAwesomeIcon = parentComplete.find('.shoppinglist-item-left .fa');
	fontAwesomeIcon.removeClass('fa fa-circle-o fa-2x');
	fontAwesomeIcon.addClass('fa fa-check-circle-o fa-2x');
	parentComplete.removeClass('incomplete');
	parentComplete.addClass('complete');

}

function decompleteListItem(listItem){
	var parentIncomplete = listItem.parents('.shoppinglist-item-container');
	var fontAwesomeIcon = parentIncomplete.find('.shoppinglist-item-left .fa');
	parentIncomplete.removeClass('complete');
	parentIncomplete.addClass('incomplete');
	fontAwesomeIcon.removeClass('fa-check-circle-o');
	fontAwesomeIcon.addClass('fa-circle-o');
}

function deleteListItem(listItemTrashCan){
	var parentDelete = listItemTrashCan.parents('.shoppinglist-item-container');
	parentDelete.remove();
}


$(document).ready(function(){
	//add a new list item
	$('#iteminput').keypress(function(e){
		if (e.keyCode == 13) {
			addListItem($('#iteminput').val());
			$('#nolist').hide();
			$('#iteminput').val("");
		};
	});

	//remove a list item
	$('#shoppinglist-ul').on('click', '.fa-trash-o', function(){
		deleteListItem($(this));
		var count = $('#shoppinglist-ul li').length;
		if(count == 0){
			$('#nolist').show();	
		};
	});

	//complete or de-complete
	$('#shoppinglist-ul').on('click', '.fa-circle-o', function(){
		completeListItem($(this));
	});
	$('#shoppinglist-ul').on('click', '.fa-check-circle-o', function(){
		decompleteListItem($(this));
	});
});

//deleteListItem($('.complete .shoppinglist-item-right'));
