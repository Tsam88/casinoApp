let baseUrl = window.location.origin;
let apiUrl = baseUrl + '/api/Bookmakers/';

jQuery(document).ready(function($) {
    getBookmakers();
});

function deleteBookmaker(bookmakerId) {
    $('*').css({'cursor' : 'wait'});

    let data = {
        "Id": bookmakerId,
    };
    
    $.ajax({
        url: apiUrl + bookmakerId,
        type: 'DELETE',
        cache:false,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "JSON",
        async: true, //blocks window close if false
        success: function(result) {  
            $('*').css({'cursor' : 'default'});

            getBookmakers();
        },
        error: function(response) {
            $('*').css({'cursor' : 'default'});

            console.log('error');
        }
    });
}

function getBookmakers() {
    $.ajax({
        url: apiUrl,
        dataType:"json",
        cache:false,
        type:'GET',
        async: true, //blocks window close if false
        success: function(result) {
            console.log(result);

            $("#bookmakersTable").empty();

            $.each(result, function (key, value) {  
                let href = baseUrl + '/BookmakersAdmin/BookmakersForm?id=' + value.id;
                let checked = value.primary === true ? 'checked' : '';
                
                $("#bookmakersTable").append(`
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${value.id}
                        </th>
                        <td class="px-6 py-4">
                            <a href="${href}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">${value.name}</a>
                        </td>
                        <td class="px-6 py-4">
                            ${value.logo}
                        </td>
                        <td class="px-6 py-4">
                            <input type="checkbox" ${checked} class="text-center form-radio text-indigo-600"/>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="deleteBookmaker(${value.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(response) {
            console.log('error');
        }
    });
}

function goToHomePage() {
    window.location.replace(baseUrl);
}

function goToBookmakersFormPage() {
    window.location.replace(baseUrl + '/BookmakersAdmin/BookmakersForm/');
}
