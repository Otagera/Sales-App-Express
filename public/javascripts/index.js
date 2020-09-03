(function(){	
	const ENTER_KEY =  13;
	const ESC_KEY = 27;
	let event = ()=>{
		//Listener for viewing products in order
		$(".clicker").click((e)=>{renderProducts(e);});

		//Listener for the edit button, then inside for double clicking on the product quantity to edit
		//then insode on keypress for when the key "enter" is clicked on to exit edit mode
		$(".deleteIconSpan").click((e)=>{
			viewMainModal.init();
			$("#yesDelete").click(()=>{
                $('#yesDelete').css({display: "block"}).html('<img src="./images/loader.gif" alt="..." width: "10" height="10";>');
				viewMainEdit.init(e, "delete");
				// $("#editForm").css("visibility", "hidden");
			});
			$("#noDelete").click(()=>{
				$("#editForm").html("");
				$("#editForm").css("visibility", "hidden");
			});
		});
	}
	let renderProducts = (ee) => {
		$(".orderProductsSub").each((i, tr)=>{
			if(ee.target.parentElement.dataset.id === tr.dataset.id){
				if($(tr).css("display") == "table-row"){
					$(tr).css("display", "none");
				}else if($(tr).css("display") == "none"){
					$(tr).css("display", "table-row");
				}
			}
		});
	}
	let subEventForm = (e)=>{
		
		$(".productRow").on("dblclick", ".textDoubleCLick", (ee)=>{
			
			$(ee.target).replaceWith(`<input class="smallTableInput" id="" type="" name="qty[]" value="${ee.target.textContent}">`);
			$(".productRow").on("keypress", ".smallTableInput", (eee)=>{
				if(eee.which === ENTER_KEY) {
					eee.preventDefault();
					$(eee.target).replaceWith(`<td class="textDoubleCLick">${eee.target.value}</td>`);
					return;
				}
			});
			$(".productRow").on("keydown", ".smallTableInput", (eee)=>{
				if(eee.which === ESC_KEY) {
					eee.preventDefault();
					$(eee.target).replaceWith(`<td class="textDoubleCLick">${ee.target.textContent}</td>`);
					return;
				}
			});
		});
				
		/*
		// To automatically change the td to txt box
		Array.from($(".productRow")).forEach((tr)=>{
			td = tr.lastElementChild;
			// console.log(tr);
			td.classList.forEach((t)=>{
				if(t === "textDoubleCLick"){
					$(td).trigger($.Event('dblclick'));
				}
			});
		});
		*/
		
		$(".submit").click((ee)=>{
			console.log("submit");
			$("#productList tbody input").each((itr, inp)=>{
				inp.classList.forEach((t)=>{
					if(t === "smallTableInput"){
						//Auto Enter
						//$(".smallTableInput").trigger($.Event('keypress', { which: 13}));
					}
				});
			});
			// ee.preventDefault();
			return;
		});

		$("#addProducts").click(() => {
			$("#orderProductsNew").css("display", "initial");
		});
	}

	let viewMainModal = {
		init: ()=>{
			viewMainModal.modalRender();
		},
		modalRender: ()=>{
			$("#editForm").css("visibility", "visible");
			$("#editForm").css("margin-left", "5.5rem");
			$("#editForm").css("margin-top", "auto");
			$("#editForm").css("margin-bottom", "auto");
			$("#editForm").css("height", "25vh");
			$("#editForm").html(`<div id="modal">`
				+ `<h2 class="bold">This would this ${octupus.getState()}. <br> Are you sure you want to do that?</h2>`
				+ `<button class="black" id="yesDelete">Yes</button>`
				+ `<button class="black" id="noDelete">No</button>`
			+ `</div>`);
		},
		successRender: (whatWasDeleted)=>{
			let name = "";
			if(octupus.getState() === "product") {
				name = whatWasDeleted.name;
			} else if(octupus.getState() === "order") {
				name = whatWasDeleted.customerName;
			} else if(octupus.getState() === "inventory") {
				// name = whatWasDeleted.name;
			}
			$("#editForm").html(`<h2 class="bold">${name} has been succesfully deleted.<br></h2>`);	
			let timeout = setTimeout(()=>{
				$("#editForm").html(``);
			}, 5000);
			clearTimeout(timeout);
		}
	}
	event();
	subEventForm();
})();