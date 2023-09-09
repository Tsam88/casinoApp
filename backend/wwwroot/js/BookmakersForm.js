let bookmakerId = getUrlVar()["id"];
let baseUrl = window.location.origin;
let apiUrl = baseUrl + '/api/Bookmakers/';

jQuery(document).ready(function($) {
    if (!isNaN(bookmakerId)) {
        apiUrl += bookmakerId

        $.ajax({
            url: apiUrl,
            dataType:"json",
            type:'GET',
            async: true, //blocks window close if false
            success: function(result) {
                console.log(result['url']);

                $("#name").val(result['name']);
                $("#code").val(result['code']);
                $("#buttonText").val(result['buttonText']);
                $("#description").val(result['description']);
                $("#logo").val(result['logo']);
                $("#url").val(result['url']);
                $('#primary').attr('checked', result['primary']);
            },
            error: function(response) {
                console.log('error');
            }
        });
    }
});

function saveBookmaker() {
    let data = {
        "Name": $('#name').val(),
        "Code": $('#code').val(),
        "ButtonText": $('#buttonText').val(),
        "Description": $('#description').val(),
        "Logo": $('#logo').val(),
        "Url": $('#url').val(),
        "Primary": $('#primary').is(":checked"),
    };

    if (isNaN(bookmakerId)) {
        method = 'POST';
    } else {
        method = 'PUT';
        data.Id = bookmakerId;
    }
    
    $.ajax({
        url: apiUrl,
        type: method,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "JSON",
        async: true, //blocks window close if false
        success: function(data) {  
            goToBookmakersList();
        },
        error: function(response) {
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

function goToBookmakersList() {
    window.location.replace(baseUrl + '/BookmakersAdmin/BookmakersList');
}
