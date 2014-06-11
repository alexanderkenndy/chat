$(document).ready(function(){ 
	myLayout = $('body').layout({
        west__size: 300,
        east__size: 300, // RESIZE Accordion widget when panes resize 
        west__onresize: $.layout.callbacks.resizePaneAccordions,
        east__onresize: $.layout.callbacks.resizePaneAccordions
    });
    // ACCORDION - in the West pane
    $("#accordion1").accordion({
        //heightStyle: "fill"
		collapsible: true
    });
    // ACCORDION - in the East pane - in a 'content-div'
    $("#accordion2").accordion({
        //heightStyle: "fill",
        //active: 1
		collapsible: true
    });
	require(['socket.io/socket.io'],function(socket){
		$(".chat-ui-sendmsg-btn").button().click(function(event){
			var content = $(".chat-ui-content-input").val();
			socket.emit('broadcast room',content);
			sendMsg('Tracy',content);
			$(".chat-ui-content-input").val('');
		});
		socket.on('new message',function(msg){
			sendMsg('Tom',msg);
		});

	});
	//add fake message
	
        // THEME SWITCHER
    addThemeSwitcher('.ui-layout-north', {
        top: '12px',
        right: '5px'
    });
    setTimeout(myLayout.resizeAll, 1000); 
});
function sendMsg(userName,msg){
	//TODO message resolve and add client's pc time
	//below is sample code
	var title = $("<div class='message'></div>");
	var userName = "Tracy";
	var user = $("<strong>" + userName + "</strong>");
	var mDate = $("<span>" + new Date() + "</span>");
	title.append(user);
	title.append(mDate);
	var div = $("<div></div>");
	var contentContainer = $("<div></div>");
	contentContainer.text(msg);
	div.append(title);
	div.append(contentContainer);
	$(".chat-ui-content-rec").append(div);

}

