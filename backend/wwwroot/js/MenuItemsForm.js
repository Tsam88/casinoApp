let menuItemId = getUrlVar()["id"];
let baseUrl = window.location.origin;
let apiUrl = baseUrl + '/api/MenuItems/';

jQuery(document).ready(function($) {
    if (!isNaN(menuItemId)) {
        apiUrl += menuItemId

        $.ajax({
            url: apiUrl,
            dataType:"json",
            type:'GET',
            async: true, //blocks window close if false
            success: function(result) {
                $("#name").val(result['name']);
                $("#url").val(result['url']);
                $("#order").val(result['order']);
            },
            error: function(response) {
                console.log('error');
            }
        });
    }
});

function saveMenuItem() {
    $('*').css({'cursor' : 'wait'});

    let data = {
        "Name": $('#name').val(),
        "Url": $('#url').val(),
        "Order": $('#order').val(),
    };

    if (isNaN(menuItemId)) {
        method = 'POST';
    } else {
        method = 'PUT';
        data.Id = menuItemId;
    }
    
    $.ajax({
        url: apiUrl,
        type: method,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "JSON",
        async: true, //blocks window close if false
        success: function(data) {  
            $('*').css({'cursor' : 'default'});

            goToMenuItemsList();
        },
        error: function(response) {
            $('*').css({'cursor' : 'default'});

            console.log('error');
        }
    });
}

function getUrlVar() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function goToMenuItemsList() {
    window.location.replace(baseUrl + '/MenuItemsAdmin/MenuItemsList');
}
