$(document).ready(function(){
    $.ajax({
        url: 'api/MenuItems',
        dataType:"json",
        async: true, //blocks window close if false
        success: function(result) {
            for (var i = 0; i <= result.length - 1; i++) {
                $("#menuListItems").append(
                    '<li><a href="#" class="text-white-700 hover:bg-white-50 border-b border-white-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">' + result[i].name + '</a></li>'
                );
            }
        },
        error: function(response) {
            console.log('error');
        }
    });

    $.ajax({
        url: 'api/Bookmakers',
        dataType:"json",
        async: true, //blocks window close if false
        success: function(result) {
            // primary bookmaker
            $("#primaryBookmakerName").text(result[0]['name']);
            $("#primaryBookmakerCode").text(result[0]['code']);
            // $("#primaryBookmakerImage").val(result[0]['logo']);
            $("#primaryBookmakerPrice").text(result[0]['price']);
            $("#primaryBookmakerDescription").text(result[0]['description']);
            $("#primaryBookmakerButtonText").text(result[0]['buttonText']);
            $("#primaryBookmakerButtonText").attr('href', result[0]['url']);

            // // secondary bookmaker 1
            $("#secondaryBookmakerName1").text(result[1]['name']);
            $("#secondaryBookmakerCode1").text(result[1]['code']);
            // $("#secondaryBookmakerImage1").val(result[1]['logo']);
            $("#secondaryBookmakerPrice1").text(result[1]['price']);
            $("#secondaryBookmakerDescription1").text(result[1]['description']);
            $("#secondaryBookmakerButtonText1").text(result[1]['buttonText']);
            $("#secondaryBookmakerButtonText1").attr('href', result[1]['url']);

            // // secondary bookmaker 2
            $("#secondaryBookmakerName2").text(result[2]['name']);
            $("#secondaryBookmakerCode2").text(result[2]['code']);
            // $("#secondaryBookmakerImage2").val(result[2]['logo']);
            $("#secondaryBookmakerPrice2").text(result[2]['price']);
            $("#secondaryBookmakerDescription2").text(result[2]['description']);
            $("#secondaryBookmakerButtonText2").text(result[2]['buttonText']);
            $("#secondaryBookmakerButtonText2").attr('href', result[2]['url']);

            $("#bookmakersDropdownList").empty();

            $.each(result, function (key, value) {  
                $("#bookmakersDropdownList").append(`
                    <li><a href="${value.url}" target="_blank" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">${value.name}</a></li>
                `);
            });
        },
        error: function(response) {
            console.log('error');
        }
    });
});

function redirectBack(){
    window.location.replace(document.referrer);
}

function displaySubmenu(){
    document.getElementById('dropdownNavbar').style.display = 'block';
}
function hideSubmenu(){
    document.getElementById('dropdownNavbar').style.display = 'none';
}
