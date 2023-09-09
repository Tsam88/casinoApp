let baseUrl = window.location.origin;
let apiUrl = baseUrl + '/api/MenuItems/';

jQuery(document).ready(function($) {
    getMenuItems();
});

function deleteMenuItem(menuItemId) {
    $('*').css({'cursor' : 'wait'});

    let data = {
        "Id": menuItemId,
    };
    
    $.ajax({
        url: apiUrl + menuItemId,
        type: 'DELETE',
        cache:false,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "JSON",
        async: true, //blocks window close if false
        success: function(result) {  
            $('*').css({'cursor' : 'default'});

            getMenuItems();
        },
        error: function(response) {
            $('*').css({'cursor' : 'default'});

            console.log('error');
        }
    });
}

function getMenuItems() {
    $.ajax({
        url: apiUrl,
        dataType:"json",
        cache:false,
        type:'GET',
        async: true, //blocks window close if false
        success: function(result) {
            $("#menuItemsTable").empty();

            $.each(result, function (key, value) {  
                let href = baseUrl + '/MenuItemsAdmin/MenuItemsForm?id=' + value.id;
                
                $("#menuItemsTable").append(`
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${value.id}
                        </th>
                        <td class="px-6 py-4">
                            <a href="${href}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">${value.name}</a>
                        </td>
                        <td class="px-6 py-4">
                            ${value.url}
                        </td>
                        <td class="px-6 py-4">
                            ${value.order}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button onclick="deleteMenuItem(${value.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

function goToMenuItemsFormPage() {
    window.location.replace(baseUrl + '/MenuItemsAdmin/MenuItemsForm/');
}

// $.ajax({
//     url: '/get_open_project_parents',
//     data: {
//         'project_id': $('#project_id').val()
//     },
//     dataType:"json",
//     async: true, //blocks window close if false
//     success: function(data) {
//         $.each(data.open_project_parents, function (key, value) {
//             if (value.id !== '-1') {
//                 if (value.id === data.selected_option_id) {
//                     $('#open_project_parent').append(`<option selected value="${value.id}">${value.name}</option>`);
//                 } else {
//                     $('#open_project_parent').append(`<option value="${value.id}">${value.name}</option>`);
//                 }
//             } else {
//                 $('#open_project_parent').append(`<option value="${value.id}" disabled>${value.name}</option>`);
//             }
//         })
//     },
//     error: function(response) {
//         console.log('error');
//     }
// });

// function addMainUser() {
//     var count = $('.main_user_container').length;

//     $(".main_user_container:last").after(
//         `<div class="main_user_container mt-2" id=main_user_container${count}>
//                     <div>
//                         <input id="main_user_first_name${count}" name="main_user_first_name" type="text" placeholder="Όνομα" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_last_name${count}" name="main_user_last_name" type="text" placeholder="Επώνυμο" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_email${count}" name="main_user_email" type="text" placeholder="Email" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_phone_number${count}" name="main_user_phone_number" type="text" placeholder="Τηλέφωνο" value="" class="text-sm mb-0 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />                
//                     </div>
//                     <button id="remove_main_user${count}" name="remove_main_user"
//                             class="remove_main_user mt-0 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-primary-remove hover:bg-red-600 text-white font-normal py-2 px-4 mr-1 rounded"
//                             type="button">
//                         Αφαίρεση
//                     </button>
//                 </div>`
//     );
// }

// $('.remove_main_user').live('click', 'button', function(e){
//     var count = $('.main_user_container').length - 1;

//     if (count > 0) {
//         indicator = e.target.id.replace('remove_main_user','');

//         $('#main_user_container' + indicator).remove();

//         $.each($('.main_user_container'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_container';
//             } else {
//                 value.id = 'main_user_container' + key;
//             }
//         });
//         $.each($('input[name="main_user_first_name"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_first_name';
//             } else {
//                 value.id = 'main_user_first_name' + key;
//             }
//         });
//         $.each($('input[name="main_user_last_name"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_last_name';
//             } else {
//                 value.id = 'main_user_last_name' + key;
//             }
//         });
//         $.each($('input[name="main_user_email"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_email';
//             } else {
//                 value.id = 'main_user_email' + key;
//             }
//         });
//         $.each($('input[name="main_user_phone_number"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_phone_number';
//             } else {
//                 value.id = 'main_user_phone_number' + key;
//             }
//         });
//         $.each($('.remove_main_user'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'remove_main_user';
//             } else {
//                 value.id = 'remove_main_user' + key;
//             }
//         });
//     }
// });


// $('#submit').on('click', function(){
//     // set status to temporary storage
//     // window.project_status = 5;
//     updateProject();
// });

// function redirectBack(){
//     window.location.replace(document.referrer);
// }

// var formData = new FormData();

// var updateProject = function() {
//     $('#submit').attr('disabled','disabled');

//     formData.forEach(function (key, value) {
//         formData.delete(value);
//     });

//     budget_before_vat = $('#budget_before_vat').val()
//     console.log(budget_before_vat)

//     if (budget_before_vat !== ''){
//         budget_before_vat = parseFloat(budget_before_vat);
//     }

//     formData.append('group_one_pager_id', $('#group_one_pager_id').val());
//     formData.append('project_id', $('#project_id').val());
//     formData.append('action_title_en', $('#action_title_en').val());
//     formData.append('code', $('#code').val());
//     formData.append('show_in_website', $('#show_in_website').prop( "checked" ));
//     formData.append('show_in_general_timeline', $('#show_in_general_timeline').prop( "checked" ));
//     formData.append('show_in_sector_timeline', $('#show_in_sector_timeline').prop( "checked" ));
//     formData.append('action_description', $('#action_description > .ql-editor').html());
//     formData.append('action_description_en', $('#action_description_en > .ql-editor').html());
//     formData.append('project_maturation', $('#project_maturation').val());
//     formData.append('timeline', $('#timeline').val());
//     formData.append('auction_horizon', $('#auction_horizon').val());
//     formData.append('estimated_start_date', $('#estimated_start_date').val());
//     formData.append('estimated_end_date', $('#estimated_end_date').val());
//     formData.append('intervention_type', $('#intervention_type').val());
//     formData.append('intervention_sector', $('#intervention_sector').val());    
//     formData.append('project_category', $('#project_category').val());
//     // formData.append('aa_identifier', $('#aa_identifier').val());
//     formData.append('bible_chapter', $('#bible_chapter').val());
//     formData.append('bible_publication', $('#bible_publication').val());
//     formData.append('priority', $('#priority').val());
//     formData.append('purpose_title_bible', $('#purpose_title_bible').val());
//     formData.append('purpose_text_bible', $('#purpose_text_bible > .ql-editor').html());
//     formData.append('estimated_benefits_title_bible', $('#estimated_benefits_title_bible').val());
//     formData.append('estimated_benefits_text_bible', $('#estimated_benefits_text_bible > .ql-editor').html());
//     formData.append('budget_before_vat', budget_before_vat);
//     formData.append('mazi_code', $('#mazi_code').val());
//     formData.append('pde_code', $('#pde_code').val());
//     formData.append('project_website', $('#project_website').val());
//     formData.append('approved_code_mis_epde_opsaa', $('#approved_code_mis_epde_opsaa').prop( "checked" ));
//     formData.append('financial_source_project_auditor', $('#financial_source_project_auditor').val());
//     formData.append('projects', $('#projects').val());
//     formData.append('not_existing_project', $('#not_existing_project').val());
//     formData.append('open_project_parent', $('#open_project_parent').val());
//     var projects = $('#projects').val();
    
//     formData.delete('existing_projects[]');
//     if (projects) {
//         for (var i = 0; i < projects.length; i++) {
//             formData.append('existing_projects[]', projects[i]);
//         }
//     }

//     var main_user_first_name = $('input[name=main_user_first_name]').map(function() {
//         return this.value;
//     }).get();
//     var main_user_last_name = $('input[name=main_user_last_name]').map(function() {
//         return this.value;
//     }).get();
//     var main_user_email = $('input[name=main_user_email]').map(function() {
//         return this.value;
//     }).get();
//     var main_user_phone_number = $('input[name=main_user_phone_number]').map(function() {
//         return this.value;
//     }).get();

//     formData.delete('main_user_first_name[]');
//     formData.delete("main_user_last_name[]");
//     formData.delete("main_user_email[]");
//     formData.delete("main_user_phone_number[]");
//     if (main_user_last_name) {
//         $.each(main_user_last_name, function (key, value) {
//             formData.append('main_user_last_name[]', value);
//             formData.append('main_user_first_name[]', main_user_first_name[key]);
//             formData.append('main_user_email[]', main_user_email[key]);
//             formData.append('main_user_phone_number[]', main_user_phone_number[key]);
//         })
//     }

//     var similar_projects = $('#similar_projects').val();
//     formData.delete('similar_projects[]');
//     if (similar_projects) {
//         for (var i = 0; i < similar_projects.length; i++) {
//             formData.append('similar_projects[]', similar_projects[i]);
//         }
//     }

//     formData.append('csrfmiddlewaretoken', CSRF_TOKEN);

//     $('*').css({'cursor' : 'wait'});

//     $.ajax({
//         url: '/update_approved_project_auditor',
//         // enctype: 'multipart/form-data',
//         data: formData,
//         cache: false,
//         processData: false,
//         contentType: false,
//         enctype: 'multipart/form-data',
//         type: 'POST',
//         async: true, //blocks window close if false
//         success: function(data) {
//             $('.error-border-red').removeClass('error-border-red');
//             var errorString = '<ul>';
//             $.each(data, function (key, value){
//                 errorString += '<li>' + value + '</li>';
//                 $("#"+key).addClass('error-border-red');
//                 if (key == 'success'){
//                     scrollTop = false;
//                     window.location.replace("/?approved_projects=true");
//                 } else {
//                     scrollTop = true;
//                 }
//             })

//             if (scrollTop) {
//                 $(".form-errors").html(errorString);
//                 $("html, body").animate({ scrollTop:$('.form-errors').offset().top}, "slow");
//             }

//             $('#submit').removeAttr('disabled');
//             $('*').css({'cursor' : 'default'});
//             $('.ql-editor > p, br').removeAttr('style');
//         },
//         error: function(response) {
//             $('#submit').removeAttr('disabled');
//             $('*').css({'cursor' : 'default'});
//             $('.ql-editor > p, br').removeAttr('style');
//             console.log('error');
//         }
//     });
// }

// function addMainUser() {
//     var count = $('.main_user_container').length;

//     $(".main_user_container:last").after(
//         `<div class="main_user_container mt-2" id=main_user_container${count}>
//                     <div>
//                         <input id="main_user_first_name${count}" name="main_user_first_name" type="text" placeholder="Όνομα" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_last_name${count}" name="main_user_last_name" type="text" placeholder="Επώνυμο" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_email${count}" name="main_user_email" type="text" placeholder="Email" value="" class="text-sm mb-4 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />
//                         <input id="main_user_phone_number${count}" name="main_user_phone_number" type="text" placeholder="Τηλέφωνο" value="" class="text-sm mb-0 sm:text-base relative w-1/3 border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-4" />                
//                     </div>
//                     <button id="remove_main_user${count}" name="remove_main_user"
//                             class="remove_main_user mt-0 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-primary-remove hover:bg-red-600 text-white font-normal py-2 px-4 mr-1 rounded"
//                             type="button">
//                         Αφαίρεση
//                     </button>
//                 </div>`
//     );
// }

// $('.remove_main_user').live('click', 'button', function(e){
//     var count = $('.main_user_container').length - 1;

//     if (count > 0) {
//         indicator = e.target.id.replace('remove_main_user','');

//         $('#main_user_container' + indicator).remove();

//         $.each($('.main_user_container'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_container';
//             } else {
//                 value.id = 'main_user_container' + key;
//             }
//         });
//         $.each($('input[name="main_user_first_name"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_first_name';
//             } else {
//                 value.id = 'main_user_first_name' + key;
//             }
//         });
//         $.each($('input[name="main_user_last_name"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_last_name';
//             } else {
//                 value.id = 'main_user_last_name' + key;
//             }
//         });
//         $.each($('input[name="main_user_email"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_email';
//             } else {
//                 value.id = 'main_user_email' + key;
//             }
//         });
//         $.each($('input[name="main_user_phone_number"]'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'main_user_phone_number';
//             } else {
//                 value.id = 'main_user_phone_number' + key;
//             }
//         });
//         $.each($('.remove_main_user'), function (key, value) {
//             if (key === 0) {
//                 value.id = 'remove_main_user';
//             } else {
//                 value.id = 'remove_main_user' + key;
//             }
//         });
//     }
// });


// $('#submit').click(updateProject);
