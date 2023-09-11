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
                $("#name").val(result['name']);
                $("#code").val(result['code']);
                $("#price").val(result['price']);
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
        "Price": $('#price').val(),
        "ButtonText": $('#buttonText').val(),
        "Description": $('#description').val(),
        // "Logo": $('#logo').val(),
        // "Logo": $('#logo')[0].files[0].name,
        // "LogoFile": $('#logo')[0].files[0],
        // "Logo": $('#logo')[0].files[0],
        "Url": $('#url').val(),
        "Primary": $('#primary').is(":checked"),
    };

    console.log(data);

    if (isNaN(bookmakerId)) {
        method = 'POST';
    } else {
        method = 'PUT';
        data.Id = bookmakerId;
    }



    let formData = new FormData();

    formData.append("Name", $('#name').val());
    formData.append("Code", $('#code').val());
    formData.append("Price", $('#price').val());
    formData.append("ButtonText", $('#buttonText').val());
    formData.append("Description", $('#description').val());
    formData.append("Url", $('#url').val());
    formData.append("Primary", $('#primary').is(":checked"));
    // formData.append("Logo", $('#logo')[0].files[0]);
    

    if ($('#logo').val()) {
        formData.append("Logo", $('#logo')[0].files[0]);
        // formData.append("Logo", $('#logo')[0].files[0].name);
        // formData.append("LogoFile", $('#logo')[0].files[0]);
    }


    console.log('API url: ' + apiUrl);

    $.ajax({
        url: apiUrl,
        type: method,
        data: JSON.stringify(data),
        // data: data,
        contentType: 'application/json',
        processData: false,
        dataType: "JSON",
        async: true, //blocks window close if false
        success: function(data) {  
            goToBookmakersList();
        },
        error: function(response) {
            console.log('error');
        }
    });

    // $.ajax({
    //     url: apiUrl,
    //     type: method,
    //     data: formData,
    //     enctype: "multipart/form-data",
    //     contentType: 'application/json',
    //     processData: false,
    //     // contentType: false,
    //     dataType: "JSON",
    //     async: true, //blocks window close if false
    //     success: function(data) {  
    //         goToBookmakersList();
    //     },
    //     error: function(response) {
    //         console.log('error');
    //     }
    // });
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
