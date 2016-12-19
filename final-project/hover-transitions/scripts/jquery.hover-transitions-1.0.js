/*
HoverTransitions - jQuery
Author: A H Rahim
Author URI: http://codecanyon.net/user/ahrahim
Version: 1.0
*/

// to reverse arrays 
jQuery.fn.reverse = [].reverse;

(function( $ ){
				
	$.fn.hover_transitions = function(options) {		
  		/* properties that do not have defaults */
  		
  		// height_one 
  		// width_one 
  		// innerHTML_two  
    	// image_src_two 
    	// class_one
    	// class_two
    	// font_size_one
    	// font_size_two
    	// font_family_one
    	// font_family_two    	
    	// background_color_one
  		// background_color_two
    	// color_one
  		// color_two
  		// border_radius_one
    	// border_radius_two  		
  		
  		// alt_hover_control
    	// alt_click_control_one
        // alt_click_control_two
    		
    		
  		// 	properties with defaults		
  		var settings = $.extend( {   		
    		display: "inline-block",
    		text_decoration: "none",
    		text_align: "center",
    		
    		rewind_on_mouse_out: true,
    		
    		pattern: "diagonal", 
    		flip_pattern_horizontal: false,
    		flip_pattern_vertical: false,
    		rotate_pattern: false,
    		pattern_reflection: 1,
    		show_method: "fade",  
    		hide_method: "fade",
    		fly_show_direction: "random",
    		fly_hide_direction: "random",
    		fly_hide_fade_speed: 300,
    		fly_distance: 100,
    		rows: 6,
    		cols: 6,
    		pattern_speed: 30,
    		show_speed: 500,
    		hide_speed: 500,
    		event_mode: "hover" 
    		
    		
    	}, options);  
    	// access options like this: settings.button_height
  	
  		this.each(function() {
					
    		// global variables
    		var el = $(this);
    		var parent = el.parent();
    		
    		var el_width;
			var el_height;
			
			var el_outer_width;
			var el_outer_height;
			
			var is_el_absolute = el.css("position") == "absolute" ? true : false;
    		
    		var el_coded_top = el.css("top");
    		var el_coded_left = el.css("left");   		
    		
    		
    		var hide_original = true;
    		if (settings.pattern == "checks" || settings.pattern == "corners_alt" || settings.pattern == "skip_rows" || settings.pattern == "skip_columns"){
    			
    			hide_original = false;
    		}
    		// properties of the original element
    		
    		// attributes without defaults    					
 		    
    		if(options.height_one){
    			el.css("height",options.height_one);
    		}
    		if(options.width_one){
    			el.css("width",options.width_one);
    		}			
    		if(options.font_size_one){
    			el.css("font_size",options.font_size_one);
    		}
    		if(options.font_family_one){
    			el.css("font_family",options.font_family_one);
    		}
    		if(options.background_color_one){
    			el.css("background-color",options.background_color_one);
    		}
    		if(options.color_one){
    			el.css("color",options.color_one);
    		}
    		if(options.border_radius_one){
    			el.css("border-radius",options.border_radius_one);
    		}
  			
    		//!! will not overwrite previously set properties because they have more specificity
    		if(options.class_one){
    			 el.addClass(options.class_one);
    		}
    		
    		// attributes with defaults
    		if (!el.is('img')){
	    		el.css({    						
		    		"text-decoration" : settings.text_decoration,		 							
					"text-align": settings.text_align				
				});
    		}
    		el.css("display", settings.display);
    		
    		///////////////////////
    		//////// create cloned elements to hover over 			
			////////////////////////////			
					
	    	var cloned = el.clone();	    	
				
			// user defined properties of the hovered elements. none of these have defaults		
			if (!cloned.is('img')){
				cloned.html(options.innerHTML_two);
			}else{					
				cloned.attr("src",options.image_src_two);
			}
    					
    		if(options.font_size_two){
    			
    			cloned.css("font_size",options.font_size_two);
    		}
    		if(options.font_family_two){
    			cloned.css("font_family",options.font_family_two);
    		}
    		if(options.background_color_two){
    			cloned.css("background-color",options.background_color_two);
    		}
    		if(options.color_two){
    			cloned.css("color",options.color_two);
    		}
    		if(options.border_radius_two){
    			cloned.css("border-radius",options.border_radius_two);
    		}  				
    		
    		//!! will not overwrite previously set properties because they have more specificity
    		if(options.class_two){
    			if(options.class_one){cloned.removeClass(options.class_one);}    			
    			cloned.addClass(options.class_two);
    		}		
				
			// important! this is done here to let the pictures load first and thus put everythig in the right place.	
			$(window).load(function() {
				
				cloned.css({  
					"position":"absolute",
					"z-index":"21", // 21 so that it is over the grid boxes which are at 20
					"overflow": "hidden",
					"margin": el.css("margin")
				});
					
				var offset = el.position();				
				
				offset.top = Math.round(offset.top);
				offset.left = Math.round(offset.left);				
							
				cloned.css({"top": offset.top, "left": offset.left});				
								
				cloned.appendTo(parent);
				
				// dimensions section must be done after the clone has been added to the document
				
				// force cloned to be the same height as the original since the user
				// can add extra content and make it bigger thus spoiling the event's hover effects.				
				el_width =  Math.round(el.css("width"));
				el_height = Math.round(el.css("height"));				
		
				// get the width of the new cloned element
				var cloned_width = Math.round(el.outerWidth(false) - ((parseInt(cloned.css("border-left-width"))?parseInt(cloned.css("border-left-width")):0) + (parseInt(cloned.css("border-right-width"))?parseInt(cloned.css("border-right-width")):0)+       (parseInt(cloned.css("padding-left"))?parseInt(cloned.css("padding-left")):0) + (parseInt(cloned.css("padding-right"))?parseInt(cloned.css("padding-right")):0)));
				var cloned_height = Math.round(el.outerHeight(false) -( (parseInt(cloned.css("border-top-width"))?parseInt(cloned.css("border-top-width")):0) + (parseInt(cloned.css("border-bottom-width"))?parseInt(cloned.css("border-bottom-width")):0)+     (parseInt(cloned.css("padding-top"))?parseInt(cloned.css("padding-top")):0) + (parseInt(cloned.css("padding-top"))?parseInt(cloned.css("padding-top")):0)));
				
								
				cloned.css({  
					"height": cloned_height, //cloned_height,
					"width": cloned_width// cloned_width				
				});				
				
				var pieces; 
				pieces  = get_boxes(cloned,{style: settings.pattern, cols: settings.cols, rows: settings.rows, flip_pattern_horizontal: settings.flip_pattern_horizontal, flip_pattern_vertical: settings.flip_pattern_vertical, rotate_pattern: settings.rotate_pattern, pattern_reflection: settings.pattern_reflection});				
							
				cloned.css({"opacity":0}); // to hide the cloned element
											
				var trans_state = 1; //
				// 1= not started
				// 2= leg 1 started
				// 3 = leg 1 ended
				// 4 = leg 2 started
				
				var pieces_started = -1; // the first piece is 0 thus -1 when none started
				var first_time = true;							
				
				var pieces_timers = new Array(); 
							
				var pieces_left = new Array();
				var pieces_top = new Array();
				var pieces_colNo = new Array();
				var pieces_rowNo = new Array();
				
				
				//////////////
				pieces.each(function(index){
					var piece = this;
					piece.css("z-index",20);
					// get back the original z-index
					piece.children().css("z-index",0);
												
					pieces_left[index] = piece.css("left"); 
					pieces_top[index] = piece.css("top");
					
					var className = piece.attr("class");
					pieces_colNo[index] = parseInt(className.substring(12,className.indexOf("row")-1));
					pieces_rowNo[index] = parseInt(className.substring(className.indexOf("row")+3));	
												
				});
				//////////////////////////
							
				function show_pieces(){
								
					if(trans_state == 1 || trans_state == 4){
									
		    			trans_state = 2;
		    			var was_first_time; //r
						if(first_time){
							first_time = false;
							was_first_time = true;
						}else{
							pieces = pieces.reverse();
							pieces_left = pieces_left.reverse();
	    					pieces_top = pieces_top.reverse();
	    					pieces_colNo = pieces_colNo.reverse();
	    					pieces_rowNo = pieces_rowNo.reverse();
	    								
							was_first_time = false;
						}
									
		    			var delay = 0;
		    			
						// add stop when trans > 2
						// dont use a loop but use this function becuase it stores the piece which will disappear when the loop ends but the timer is still running. 
						pieces.each(function(index){
				            			
				        	clearTimeout(pieces_timers[index]);
				            				
							var piece = this;
											
							if(settings.hide_method == "fly"){
								piece.stop(true,true);
								piece.css("left",pieces_left[index]); 
								piece.css("top",pieces_top[index]); 
												
							}
											
							// this function could execute when the other hide function is also executing
							var func_show_pieces = function(){
								if(trans_state == 2  &&   index > pieces_started){// to stop this code firing when it is supposed to stop																	
									
									pieces_started = index;	
									
									//here is where we decide what the animation is and execute it 
													
									if(settings.show_method == "fade"){
														
										piece.stop(true,true).fadeIn(settings.show_speed,ending);
														
									}else if (settings.show_method == "puff"){
														
										piece.stop(true,true).show("puff",settings.show_speed,ending);
														
									}else if (settings.show_method == "slide_down"){
														
										piece.stop(true,true).show("slide", { direction: "up" },settings.show_speed,ending);
													
									}else if (settings.show_method == "slide_up"){
														
										piece.stop(true,true).show("slide", { direction: "down" },settings.show_speed,ending);
													
									}else if (settings.show_method == "slide_left"){
														
										piece.stop(true,true).show("slide", { direction: "right" },settings.show_speed,ending);
													
									}else if (settings.show_method == "slide_right"){
														
										piece.stop(true,true).show("slide", { direction: "left" },settings.show_speed,ending);
														
									}else if (settings.show_method == "sliding_doors_horizontal"){
														
										if(pieces_colNo[index] > (Math.ceil(settings.cols/2)-1)){
											piece.stop(true,true).show("slide", { direction: "right" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).show("slide", { direction: "left" },settings.show_speed,ending);
										}
													
									}else if (settings.show_method == "sliding_doors_vertical"){														
										
										if(pieces_rowNo[index] > (Math.ceil(settings.rows/2)-1)){
											piece.stop(true,true).show("slide", { direction: "down" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).show("slide", { direction: "up" },settings.show_speed,ending);
										}
										
									}else if (settings.show_method == "alt_slide_vertical"){
										
										if((pieces_colNo[index]%2)==1){
											piece.stop(true,true).show("slide", { direction: "down" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).show("slide", { direction: "up" },settings.show_speed,ending);
										}
										
									}else if (settings.show_method == "alt_slide_horizontal"){
										
										if((pieces_rowNo[index]%2)==1){
											piece.stop(true,true).show("slide", { direction: "right" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).show("slide", { direction: "left" },settings.show_speed,ending);
										}
															
									}else if (settings.show_method == "fly"){														
										
										// to randomise directions
										var direction; 
														 
										if(settings.fly_show_direction == "random"){
											direction =  Math.floor(Math.random()*4); 
										}else if(settings.fly_show_direction == "split_horizontal"){
										
											if(pieces_colNo[index] > (Math.ceil(settings.cols/2)-1)){
												direction = 2;
											}else{
												direction = 0;
											}
											
										}else if(settings.fly_show_direction == "split_vertical"){
										
											if(pieces_rowNo[index] > (Math.ceil(settings.cols/2)-1)){
												direction = 3;
											}else{
												direction = 1;
											}
											
										
										}else if(settings.fly_show_direction == "alt_horizontal"){
										
											if((pieces_rowNo[index]%2)==1){
												direction = 2;
											}else{
												direction = 0;
											}
											
										}else if(settings.fly_show_direction == "alt_vertical"){
										
											if((pieces_colNo[index]%2)==1){
												direction = 3;
											}else{
												direction = 1;
											}
											
										}
														
										// in this section the pieces are placed at the starting points
										if(settings.fly_show_direction == "left" || direction == 0){
											piece.stop(true,true).css({"left":(parseInt(pieces_left[index])-settings.fly_distance) +"px", "display":"block"});
										}else if(settings.fly_show_direction == "right" || direction == 2){
											piece.stop(true,true).css({"left":(parseInt(pieces_left[index])+settings.fly_distance) +"px", "display":"block"});
										}else if(settings.fly_show_direction == "bottom" || direction == 3){
											piece.stop(true,true).css({"top":(parseInt(pieces_top[index])+settings.fly_distance) +"px", "display":"block"});
										}else{
											piece.stop(true,true).css({"top":(parseInt(pieces_top[index])-settings.fly_distance) +"px", "display":"block"});
										}
														
										// then they fly to their targets
													
										piece.animate({"left":pieces_left[index],"top":pieces_top[index]},settings.show_speed,ending);
										
									}else if(settings.show_method == "instant"){
										piece.stop(true,true).show();				
									}else{
										piece.stop(true,true).show(settings.show_speed,ending);
									} // end of piece animation section
													
								}
																				    	
				   	 		}
									
							var ending = function(){
								
								//only run the following when all the pieces have stopped animating 				
								if(index == pieces.length-1){ 
									if(trans_state != 4){
										trans_state = 3;
										if(hide_original){
											el.css("visibility","hidden");
											cloned.css("opacity",el.css("opacity"));
											pieces.css("visibility","hidden");
										}										
									}																							
								}
							} // ending function
													
							if(trans_state == 2 &&   index > pieces_started){// to stop this code firing when it is supposed to stop																	
												
								pieces_timers [index] = setTimeout(func_show_pieces,delay);
								delay = delay + settings.pattern_speed;
							}
							
						}); // looping through each piece
						
	    			}//if(trans_state == 1 || trans_state == 4){ 
								
				}// function show_pieces
							
	   			///////////////////////////////////////
	   			/////////////////////////////////////////////
	   			/////////////// mouse leave ///////////////
	   			//////////////////////////////////////
	   			////////////////////////////////////////////
	   			////////////
	   			
	   			function hide_pieces(){
	   				
	   				if(hide_original){
	   					el.css("visibility","visible");
	   					cloned.css("opacity","0");
						pieces.css("visibility","visible");
	   				}
	   						   							
	    			if(trans_state == 3 || trans_state == 2){
	    						 	   
	    				trans_state = 4;
	    				// the first leg hasn't ended 
	    				pieces = pieces.reverse();
	    				pieces_left = pieces_left.reverse();
	    				pieces_top = pieces_top.reverse();
	    				pieces_colNo = pieces_colNo.reverse();
	    				pieces_rowNo = pieces_rowNo.reverse();
	    								
	    				var delay = 0;
	    				pieces.each(function(index) {
	    								
				        	clearTimeout(pieces_timers[ pieces.length -  index - 1]);
				            					
							var piece = this;
	    								
		    				var func_hide_pieces = function(){
		    										
		    					if(trans_state == 4 &&   index >= (pieces.length - pieces_started - 1)){// to stop this code firing when it is supposed to stop		    																											
														
		    						pieces_started = pieces_started-1;
		    										
		    						if(settings.hide_method == "fade"){
														
										piece.stop(true,true).fadeOut(settings.hide_speed,ending);
														
									}else if (settings.hide_method == "puff"){
														
										piece.stop(true,true).hide("puff",settings.hide_speed,ending);
														
									}else if (settings.hide_method == "slide_down"){
														
										piece.stop(true,true).hide("slide", { direction: "down" },settings.hide_speed,ending);
														
									}else if (settings.hide_method == "slide_up"){
														
										piece.stop(true,true).hide("slide", { direction: "up" },settings.hide_speed,ending);
														
									}else if (settings.hide_method == "slide_left"){
														
										piece.stop(true,true).hide("slide", { direction: "left" },settings.hide_speed,ending);
															
									}else if (settings.hide_method == "slide_right"){
														
										piece.stop(true,true).hide("slide", { direction: "right" },settings.hide_speed,ending);
														
									}else if (settings.hide_method == "sliding_doors_horizontal"){
														
										if(pieces_colNo[index] > (Math.ceil(settings.cols/2)-1)){
											piece.stop(true,true).hide("slide", { direction: "right" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).hide("slide", { direction: "left" },settings.show_speed,ending);
										}
													
									}else if (settings.hide_method == "sliding_doors_vertical"){
														
										if(pieces_rowNo[index] > (Math.ceil(settings.rows/2)-1)){
											piece.stop(true,true).hide("slide", { direction: "down" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).hide("slide", { direction: "up" },settings.show_speed,ending);
										}
										
									}else if (settings.hide_method == "alt_slide_vertical"){
										
										if((pieces_colNo[index]%2)==1){
											piece.stop(true,true).hide("slide", { direction: "down" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).hide("slide", { direction: "up" },settings.show_speed,ending);
										}
										
									}else if (settings.hide_method == "alt_slide_horizontal"){
										
										if((pieces_rowNo[index]%2)==1){
											piece.stop(true,true).hide("slide", { direction: "right" },settings.show_speed,ending);
										}else{
											piece.stop(true,true).hide("slide", { direction: "left" },settings.show_speed,ending);
										}
														
									}else if (settings.hide_method == "fly"){
														
										// to randomise directions
										var direction; 
														 
										if(settings.fly_hide_direction == "random"){
											direction =  Math.floor(Math.random()*4); 
										}else if(settings.fly_hide_direction == "split_horizontal"){
											if(pieces_colNo[index] > (Math.ceil(settings.cols/2)-1)){
												direction = 2;
											}else{
												direction = 0;
											}
										}else if(settings.fly_hide_direction == "split_vertical"){
											if(pieces_rowNo[index] > (Math.ceil(settings.cols/2)-1)){
												direction = 3;
											}else{
												direction = 1;
											}
										}else if(settings.fly_show_direction == "alt_horizontal"){
										
											if((pieces_rowNo[index]%2)==1){
												direction = 2;
											}else{
												direction = 0;
											}
											
										}else if(settings.fly_show_direction == "alt_vertical"){
										
											if((pieces_colNo[index]%2)==1){
												direction = 3;
											}else{
												direction = 1;
											}
											
										}
														
													
										if(settings.fly_hide_direction == "left" || direction == 0){ // alternative ending -> piece.css("display","none");ending();
											piece.stop(true,true).animate({"left": (parseInt(pieces_left[index])-settings.fly_distance) +"px"},settings.hide_speed, function () {piece.fadeOut(settings.fly_hide_fade_speed,ending());});
										}else if(settings.fly_hide_direction == "right" || direction == 2){
											piece.stop(true,true).animate({"left": (parseInt(pieces_left[index])+settings.fly_distance) +"px"},settings.hide_speed, function () {piece.fadeOut(settings.fly_hide_fade_speed,ending());});
										}else if(settings.fly_hide_direction == "bottom" || direction == 3){
											piece.stop(true,true).animate({"top": (parseInt(pieces_top[index])+settings.fly_distance) +"px"},settings.hide_speed, function () {piece.fadeOut(settings.fly_hide_fade_speed,ending());});
										}else{
											piece.stop(true,true).animate({"top": (parseInt(pieces_top[index])-settings.fly_distance) +"px"},settings.hide_speed, function () {piece.fadeOut(settings.fly_hide_fade_speed,ending());});
										}
														
									}else if(settings.hide_method == "instant"){
										piece.stop(true,true).hide();				
									}else{
										piece.stop(true,true).hide(settings.show_speed,ending);
									} // end of piece animation section
							
								}// if checking trans state
																						    	
				   	 		}
				   	 						
				   	 		var ending = function(){
												
								if(index == (pieces.length-1) ){ //only run the following when all the pieces have stopped animating 
									if(trans_state != 2){	
										trans_state = 1;
									}															
								}
							}
				   	 		
		    				if(index >= (pieces.length - pieces_started - 1) ){
		    					pieces_timers [pieces.length -  index - 1] = setTimeout(func_hide_pieces,delay);
								delay = delay + settings.pattern_speed;
											
	    					}
	    				
	    				
	    				});//loop through each piece
	   			
	   				}// check trans tate
	   			}// hide_pieces fubction
	   
	   ///////////////////////////////						
	   ////////// event handling ////
	   /////////////////////////////			
	   				   			
	   			// control events
	   			
	   			// both buttons
	   			if(options.alt_click_control_two){
	   				$(options.alt_click_control_two).on("click", function(event){		    						
			    		hide_pieces();		    						    						
			   		});
			   		if(options.alt_click_control_one){
	   					$(options.alt_click_control_one).on("click", function(event){		    						
			    			show_pieces();		    						    						
			   			});				
	   				}	   					
	   			}
	   			// one button (toggle)
	   			
	   			if(options.alt_click_control_one && !options.alt_click_control_two){
	   				$(options.alt_click_control_one).toggle(function() {
  						show_pieces();
					}, function() {
  						hide_pieces();
					});						
	   			}
	   				
	   			// hover
	   			if(options.alt_hover_control){
	   				
	   				$(options.alt_hover_control).on("mouseenter", function(event){	
		   				show_pieces();
		   			}); 
		   			
		   			if(settings.rewind_on_mouse_out){
			   			$(options.alt_hover_control).on("mouseleave", function(event){		    						
			    			hide_pieces();		    						    						
			   			});		   			
		   			}
	   				
	   			}
	   			
	   			// events for cloned 
	   			
	   			if(settings.event_mode == "click"){
	   			
		   			cloned.toggle(function() {
  						show_pieces();
					}, function() {
  						hide_pieces();
					});
		   					
	   			}else if(settings.event_mode != "none"){
	   				
	   				cloned.on("mouseenter", function(event){	
		   				show_pieces();
		   			}); 
		   			
		   			if(settings.rewind_on_mouse_out){
			   			cloned.on("mouseleave", function(event){		    						
			    			hide_pieces();		    						    						
			   			});		   			
		   			}
	   				
	   			}	
	   			
	   			
	   			// this is done for zooming with browsers and resizing.
	   			$(window).resize(function() {
  					
  					offset = el.position();							
					offset.top = Math.round(offset.top);
					offset.left = Math.round(offset.left);
					
					// move the cloned if needed (not absolute or not set coordinate)
					if( (!is_el_absolute) || el_coded_left == "auto"){
						cloned.css({"left": offset.left });
					}
					if( (!is_el_absolute) || el_coded_top == "auto"){
						cloned.css({"top": offset.top });
					}
					
					// move the pieces 
					var cloned_outer_width = Math.round(cloned.outerWidth());
					var cloned_outer_height = Math.round(cloned.outerHeight());
					
					var box_width = Math.floor(cloned_outer_width / settings.cols);
					var box_height = Math.floor(cloned_outer_height / settings.rows);
					
					var last_width = cloned_outer_width-((settings.cols - 1) * box_width);
					var last_height = cloned_outer_height-((settings.rows - 1) * box_height);
					
					//add the margins - not fixing the problem yet.
					// the grid_boxes do not have margins.
					// 10 here is the radix which in this case is decimal
					offset.top += parseInt(cloned.css("marginTop")) || 0;
					offset.left += parseInt(cloned.css("marginLeft")) || 0;				
					
					pieces.each(function(index) {
						var piece = this;						
						
						var r = pieces_rowNo[index];
						var c = pieces_colNo[index];
						
						var bw = (c==(settings.cols-1)) ? last_width : box_width;
						var bh = (r==(settings.rows-1)) ? last_height : box_height;						
						
						var ol = offset.left + (c * box_width);
						var ot = offset.top + (r * box_height);
						
						// overlap to remove gaps from zoomed browsing
						 
						if(c != 0){
							bw++;
							ol--;
						}
						if(r != 0){
							bh++;
							ot--;
						}						
						
						piece.css({
							width: bw,
							height: bh,
							left: ol,
							top: ot 					
						});
						
						// to make fly work after resize
						pieces_left[index] = piece.css("left"); 
						pieces_top[index] = piece.css("top");
						
						// move box content to right place within box
						var x_offset = -(c * box_width);
						var y_offset = -(r * box_height);
						
						//to deal with overlap solution 
						if(c != 0){
							x_offset++;
						}
			
						if(r != 0){
							y_offset++;
						}
						
						piece.children().css({
							left: x_offset,
							top: y_offset	
						});						
						
					});	
					
									
				});
	   						
	   							
    		}); // window.load for image loads
    		
    		
    					 
		}); // end the each loop for plugin
	};
})( jQuery );

////////////////////////////////
////////////////////////////////
/////////////////////////////////
///////////////////////////////
// this function returns an array of div boxes in the correct order

var pattern_reflection; // global because other functions make use of it
// pattern_reflection can only be used for diagonal, crossing,  zip & regular
function get_boxes(el,options){
	// el = element which must be copied into boxes
	
	var rows = options.rows ? options.rows : 10;
	var cols = options.cols ? options.cols : 10;
	var style = options.style ? options.style : "random";
	var flip_h =  options.flip_pattern_horizontal ? options.flip_pattern_horizontal : false;
	var flip_v =  options.flip_pattern_vertical ? options.flip_pattern_vertical : false;
	var rotate_p = options.rotate_pattern ? options.rotate_pattern : false;
	pattern_reflection = options.pattern_reflection ? options.pattern_reflection : 1;
	
	var parent = el.parent();
	var offset = el.position();
	offset.top = Math.round(offset.top);
	offset.left = Math.round(offset.left);
	//add the margins - not fixing the problem yet.
	// the grid_boxes do not have margins.
	// 10 here is the radix which in this case is decimal
	offset.top += parseInt(el.css("marginTop")) || 0;
	offset.left += parseInt(el.css("marginLeft")) || 0;

	var el_width = Math.round(el.outerWidth(false));
	var el_height = Math.round(el.outerHeight(false));
	
	var box_width = Math.floor(el_width / cols);
	var last_width = el_width-((cols - 1) * box_width);

	var box_height =  Math.floor(el_height / rows);
	var last_height = el_height-((rows - 1) * box_height);
	

    // create & store the !!boxes
    var boxes = $();
    
    var grid = new Array(cols);
    // boxes is the list of objects
    // grid is a 2d (each element has an array in it) array of the boxes for manipulating and then putting back into the list
    
	for(var c=1;c<=cols;c++) {
		grid[c-1] = new Array(rows); 			
		for(var r=1;r<=rows;r++) {		
			
				var cloned = el.clone();			
				cloned.appendTo(parent);
				cloned.wrap("<div class='grid_box col"+(c-1)+" row"+(r-1)+"'></div>");			
						
			var box = parent.find('.grid_box').last();
			
			grid[c-1][r-1] = box;					
						
			var bw = (c==cols) ? last_width : box_width;
			var bh = (r==rows) ? last_height : box_height;
			var ol = offset.left + (c-1)* box_width;
			var ot = offset.top + (r-1)* box_height;
			
			// overlap to remove gaps from zoomed browsing
			if(c != 1){
				bw++;
				ol--;
			}
			if(r != 1){
				bh++;
				ot--;
			}
						
			// put box in the correct place
			box.css({
					position: 'absolute',
					overflow: 'hidden',
					width: bw,
					height: bh,
					left: ol,
					top:  ot,					
					display: 'none'
					
			});
						
			// move box content to right place within box
			var x_offset = -(c-1) * box_width;
			var y_offset = -(r-1) * box_height;
			
			//to deal with overlap solution 
			if(c != 1){
				x_offset++;
			}
			
			if(r != 1){
				y_offset++;
			}			
			// margins are removed to make sure that the positions inside the grid boxes is correct
				
				cloned.css({
					position: 'absolute',
					visibility: 'visible',
					left: x_offset,
					top: y_offset,
					margin: "0px"
				});				
		}
	}
	
	/// rotate the items acording to requirements.
	//print_2d_array(grid);
	if(flip_h){
		grid = flip_pattern_horizontal(grid);
	}
	if(flip_v){
		grid = flip_pattern_vertical(grid);
	}
	
	if(rotate_p){
		grid = rotate_pattern(grid);
	}
	//print_2d_array(grid);
	
	if(style == "random"){
		boxes = $(shuffle(regular(grid)));
	}else if (style == "spiral"){
		boxes = $(spiral(grid));
	}else if(style == "diagonal"){
		boxes = $(diagonal(grid));
	}else if (style == "crossing"){
		boxes = $(crossing(grid));
	}else if(style == "corners"){
		boxes = $(corners(grid));
	}else if(style == "corners_alt"){
		boxes = $(corners_alt(grid));
	}else if(style == "zip"){
		boxes = $(zip(grid));
	}else if(style == "checks"){
		boxes = $(checks(grid));
	}else if(style == "skip_rows"){
		boxes = $(skip_rows(grid));
	}else if(style == "skip_columns"){
		boxes = $(skip_columns(grid));
	}else if(style == "wave"){
		boxes = $(wave(grid));
	}else{
		boxes = $(regular(grid));
	}
	
	return boxes;
	
}

//////////////////////////////////////////////////
// supporting functions 
/////////////////////////////////////////////////////

function shuffle(o){ //v1.0
	
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
	
};

///////////////////////////////////////////////

function spiral (arr){		
		
		var width = arr.length;
		var height = arr[0].length;
		var total = width * height;
		var x = 0;
		var y = 0;
		
		var dir = 3;
		var down = 0;
		var up = 0;
		var left = 0;
		var right = 0;		
		
		var arr2 = new Array(total);
		var i = 0;
		while(i<total){			
		
			if(dir == 1){
				for(var y=height-down-1;y>=up;y--){					
					arr2[i]= (arr[x][y]);					
					i++;
				}
				y++;
				dir = 4;
				right++;					
			}else if(dir == 2){
				for(var x=left;x<=width-right-1;x++){					
					arr2[i]= (arr[x][y]);					
					i++;
				}
				x--;
				dir = 1;
				down++;				
			}else if(dir == 3){
				for(var y=up;y<=height-up-1;y++){					
					arr2[i]= (arr[x][y]);
					i++;
				}
				y--;
				dir = 2;
				left++;				
			}else if(dir == 4){
				for(var x=width-right-1;x>=right;x--){				
					arr2[i]= (arr[x][y]);					
					i++;
				}
				x++;
				dir = 3;
				up++;
			}
			
		}		
		
	return arr2;
}

//////////////////////////////////////////////////

function diagonal(arr){
		
		var width = arr.length;
		var height = arr[0].length;
		var total = width * height;
		var arr2 = new Array(total);
		
		var x = 0;
		var y = 0;
		var i = 0;
		
		while(x<width){
			if(x>0){y=height-1}
			while(y<height){
			
				c=y;
				d = x;
				while(c>=0 && d<width){					
				
					if(pattern_reflection > 0){
					   
						if(!linear_search(arr[d][c],arr2)){								
							arr2[i] = arr[d][c];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 1){
						
						if(!linear_search(arr[width-d-1][height-c-1],arr2)){								
							arr2[i] = arr[width-d-1][height-c-1];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 3){	
												
						if(!linear_search(arr[width-d-1][c],arr2)){
							arr2[i] = arr[width-d-1][c];
							i++;
						}
						if(!linear_search(arr[d][height-c-1],arr2)){
							arr2[i] = arr[d][height-c-1];
							i++;
						}
		
					}
					
					
					c--;
					d++;
				}
				y++;						
			}
			x++;
		}
					
		return arr2;
}

/////////////////////////////////////////////
	
function crossing(arr){
		var width = arr.length;
		var height = arr[0].length;
		var total = width * height;
		var arr2 = new Array(total);
		
		var x = 0;
		var y = 0;
		var i = 0;
		var c = 0;
		
		while(c<width || c<height){
			y=c;
			x=c;
			
			while(y < height && c<width){
				if(pattern_reflection > 0){
					   
						if(!linear_search(arr[x][y],arr2)){								
							arr2[i] = arr[x][y];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 1){
						
						if(!linear_search(arr[width-x-1][height-y-1],arr2)){								
							arr2[i] = arr[width-x-1][height-y-1];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 3){	
												
						if(!linear_search(arr[width-x-1][y],arr2)){
							arr2[i] = arr[width-x-1][y];
							i++;
						}
						if(!linear_search(arr[x][height-y-1],arr2)){
							arr2[i] = arr[x][height-y-1];
							i++;
						}
		
					}
				y++;	
			}
			
			y=c;
			x++;
			
			while(x<width && c<height){
				if(pattern_reflection > 0){
					   
						if(!linear_search(arr[x][y],arr2)){								
							arr2[i] = arr[x][y];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 1){
						
						if(!linear_search(arr[width-x-1][height-y-1],arr2)){								
							arr2[i] = arr[width-x-1][height-y-1];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 3){	
												
						if(!linear_search(arr[width-x-1][y],arr2)){
							arr2[i] = arr[width-x-1][y];
							i++;
						}
						if(!linear_search(arr[x][height-y-1],arr2)){
							arr2[i] = arr[x][height-y-1];
							i++;
						}
		
					}
				x++;
			}
			c++;
		}		
		return arr2;
}

//////////////////////////////////////////////
function wave(arr){
	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array(total);
	
	var i = 0;	
	var down = true; // wave goes down first
	
	var x = 0;
	while(x<width){
		
		var y;
		
		if(down){
			
			y = height-1;
			while(y>=0){
				arr2[i] = arr[x][y];
				y--;
				i++;
			}
			down = false;
			
		}else{
			
			y = 0;
			while(y<height){
				arr2[i] = arr[x][y];
				y++;
				i++;
			}	
			down = true;
			
		}
		
		x++;
	}
		
	
	return arr2;
}

				
function corners(arr){
	
		var width = arr.length;
		var height = arr[0].length;
		var total = width * height;
		var arr2 = new Array();
		
		
		var x = 0;
		var y = 0;
		var i = 0;
		
		
		var x_mid = Math.ceil(width/2)-1;
		var y_mid = Math.ceil(height/2)-1;
		
		var layer = 0;
	
		while(layer<=x_mid || layer<=y_mid){
			
			while(x<=x_mid && x<=layer && y<=y_mid){
				
				if(!linear_search(arr[x][y],arr2)){					
				arr2[i] = arr[x][y];
				i++;
				}
				
				if(!linear_search(arr[width-x-1][y],arr2)){
				arr2[i] = arr[width-x-1][y];
				i++;
				}
				
				if(!linear_search(arr[x][height-y-1],arr2)){
				arr2[i] = arr[x][height-y-1];
				i++;
				}
				
				if(!linear_search(arr[width-x-1][height-y-1],arr2)){
				arr2[i] = arr[width-x-1][height-y-1];
				i++;
				}
							
				x++
			}
			x=layer; // this is to make sure that x is at the last column which was filled
			
		
			while(y>=0 && x<=x_mid){
				//console.log("loop y");					
				if(!linear_search(arr[x][y],arr2)){					
				arr2[i] = arr[x][y];
				i++;
				}
				
				if(!linear_search(arr[width-x-1][y],arr2)){
				arr2[i] = arr[width-x-1][y];
				i++;
				}
				
				if(!linear_search(arr[x][height-y-1],arr2)){
				arr2[i] = arr[x][height-y-1];
				i++;
				}
				
				if(!linear_search(arr[width-x-1][height-y-1],arr2)){
				arr2[i] = arr[width-x-1][height-y-1];
				i++;
				}
							
				y--
			}
			
			layer++;
			
			y = layer;
			
			if(y>y_mid){
				y = y_mid;
			}
			
			x = 0;
		}
		
		return arr2;
					
}

////////////////////////////////////

function corners_alt(arr){
		var width = arr.length;
		var height = arr[0].length;
		var total = width * height;
		var arr2 = new Array();
		
		
		var x = 0;
		var y = 0;
		var i = 0;
		
		
		var x_mid = Math.ceil(width/2)-1;
		var y_mid = Math.ceil(height/2)-1;
		
		var layer = 0;
	
		while(layer<=x_mid || layer<=y_mid){
			
			while(x<=x_mid && x<=layer && y<=y_mid){
				
				if(!linear_search(arr[x][y],arr2)){					
					arr2[i] = arr[x][y];					
					i++;
				}				
				
				if(!linear_search(arr[width-x-1][height-y-1],arr2)){
				arr2[i] = arr[width-x-1][height-y-1];
				i++;
				}
							
				x++
			}
			x=layer; // this is to make sure that x is at the last column which was filled
			
		
			while(y>=0 && x<=x_mid){
									
				if(!linear_search(arr[x][y],arr2)){					
				arr2[i] = arr[x][y];				
				i++;
				}
					
				if(!linear_search(arr[width-x-1][height-y-1],arr2)){
				arr2[i] = arr[width-x-1][height-y-1];
				i++;
				}
							
				y--
			}
			
			layer++;
			
			y = layer;
			
			if(y>y_mid){
				y = y_mid;
			}
			
			x = 0;
		}
		
		return arr2;
		
}


///////////////////////////////////////////////
function zip(arr){
	
	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array(total);
		
	var x = 0;
	var y = 0;
	var i = 0;
		
	while(x < width){
		
		y = 0;
		while(y < height){
			
			if(!linear_search(arr[x][y],arr2)){				
				arr2[i] = arr[x][y]; 
				i++;
			}			
			
			if(!linear_search(arr[x][height-y-1],arr2)){
				arr2[i] = arr[x][height-y-1];
				i++;
			}			
			
			y++;	
		}		
		
		x++;
	}
		
	return arr2;
		
}

//////////////////////////
function regular(arr){
	
	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array(total);
		
	var x = 0;
	var y = 0;
	var i = 0;
		
	while(x < width){
		
		y = 0;
		while(y < height){
			
			if(pattern_reflection > 0){
					   
						if(!linear_search(arr[x][y],arr2)){								
							arr2[i] = arr[x][y];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 1){
						
						if(!linear_search(arr[width-x-1][height-y-1],arr2)){								
							arr2[i] = arr[width-x-1][height-y-1];
							i++;
						}	
						
					}
					
					if(pattern_reflection > 3){	
												
						if(!linear_search(arr[width-x-1][y],arr2)){
							arr2[i] = arr[width-x-1][y];
							i++;
						}
						if(!linear_search(arr[x][height-y-1],arr2)){
							arr2[i] = arr[x][height-y-1];
							i++;
						}
		
					}
			y++;
				
		}
		
		x++;
	}
	
	return arr2;
		
}

//////////////////////////
function skip_columns(arr){

	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array();
	var take = false; 
		
	var x = 0;
	var y = 0;
	var i = 0;
		
	while(x < width){
		
		y = 0;
		while(y < height){
			if(take == true){
				arr2[i] = arr[x][y];
				i++;
			} 
			y++;
				
		}
		
		if(take == false){
			take = true;
		}else{
			take = false;
		}
				
		x++;
	}
	
	return arr2;
		
}

//////////////////////////

function skip_rows(arr){

	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array();
	var take = false; 
		
	var x = 0;
	var y = 0;
	var i = 0;
		
	while(x < width){
		take = false;
		y = 0;
		while(y < height){
			if(take == true){
				arr2[i] = arr[x][y];
				i++;
				take = false;
			}else{
				take = true;
			} 
			y++;
				
		}				
		x++;
	}
	
	return arr2;
		
}

//////////////////////////

function checks(arr){

	
	var width = arr.length;
	var height = arr[0].length;
	var total = width * height;
	var arr2 = new Array();
	var take = false; 
		
	var x = 0;
	var y = 0;
	var i = 0;
	
	var odd = height % 2;
	// checks only work when the height is an odd number. if the number is even then you need to break the pattern.	
	while(x < width){
		
		y = 0;
		while(y < height){
			if(take == true){
				arr2[i] = arr[x][y];
				i++;
				take = false;
			}else{
				take = true;
			} 
			y++;
			
		}
			if(odd == 0){
				if(take == true){
					take = false;
				}else{
					take = true;
				}
			}
		
		x++;
	}
	
	return arr2;
		
}

/////////////////

function linear_search(item,list){
	var found = false;
	var c = 0;

	while(c < list.length){
		if(item == list[c]){
			found = true;
		}
		c++;	
	}

	return found;
}

///////////

function flip_pattern_horizontal(arr){
	var width = arr.length;
	var arr2 = new Array(width);
	
	var c = 0;
	
	while(c<width){
		
		arr2[c]=arr[width-c-1];
		c++;
	}
	return arr2;
}

///////////

function flip_pattern_vertical(arr){
		var height = arr[0].length;
		var width = arr.length;
	
	var arr2 = new Array(width);
	
	var x = 0;
	while(x < width){
		arr2[x] = new Array(height);
		
		var y = 0;	
		while(y<height){
			arr2[x][y] = arr[x][height-y-1]	
			y++;
		}
		
		x++;
	}		
	return arr2;
}

function rotate_pattern(arr){
	
	var height = arr[0].length;
	var width = arr.length;
	
	// create a flip/rotation of the old grid.
	var arr2 = new Array(height);
	var y = 0;
	while(y < height){
		arr2[y] = new Array(width);		
		y++;	
	}
	
	//enter values into grid
	
	var x = 0;
	while(x < width){
		
		y = 0;
		while(y < height){
			
			arr2[y][x] = arr[x][y];
			
			y++;
		}
		
		x++;
	}
	
	return arr2;  
}


//////////////////////

function print_2d_array(arr){
	
	var width = arr.length;
	var height = arr[0].length;	
	var x = 0;
	var y = 0;
	//console.log("outer array length:"+arr.length);		
	while(x < width){
		//console.log("outer array item" + arr[x]); 
		y = 0;
		//console.log("inner array length:"+arr[x].length);		
		while(y < height){		
			//console.log("inner array item" + arr[x][y]); 
			y++;				
		}						
		x++;
	}		
}
