//initial data, 2 arrays one for the list names and another for the list items
let lists = ['Shopping List', 'Books', 'Movies', 'To do']
let items = [
    {list: 'Shopping List', item: 'febreeze'},
    {list: 'Shopping List', item: 'brown sugar'},
    {list: 'Shopping List', item: 'cap'},
    {list: 'Books', item: 'the stand'},
    {list: 'Books', item: 'harry potter'},
    {list: 'Books', item: 'brisingr'}
]

const main = document.getElementById('main');
let html_to_insert = '';
let item_html = '';

//function that builds the page from the 2 data arrays
function build_page() {
    let total_html = '';
    lists.forEach(function(list) {
        html_to_insert = `<div class="list"><div style="font-weight:bold;" class="listtitle">${list}</div><table>`
        items.forEach(function(item) {
            if (list == item.list) {
                item_html = `
                    <tr>
                        <td style="padding-left:10px;">${item.item}</td>
                        <td class="delete" id="${item.item}">delete</td>
                    </tr>`
                html_to_insert += item_html;
            }
        });
        html_to_insert += `</table>
            <form class="addItem">
                <input id="newItem${list}" type="text">
                <input type="submit" class="add" value="add" id="${list}">
                <input type="submit" class="deletelist" value="delete list" id="${list}">
            </form></div>`
        total_html += html_to_insert;  
    })
    main.innerHTML = total_html;

    const deletes = document.querySelectorAll('.delete');
    const adds = document.querySelectorAll('.add');
    const deleteLists = document.querySelectorAll('.deleteList');

    let item_name = '';
    deletes.forEach(function(item) {
        item.addEventListener('click', (e) => {
            items = deleteItem(item.id);
            build_page();
        });
    });

    adds.forEach(function(list) {
        list.addEventListener('click', (e) => {
            e.preventDefault();
            let item_name = document.getElementById(`newItem${list.id}`);
            items.push({list:list.id, item:item_name.value});
            build_page();
        })
    }) 
    
    deleteLists.forEach(function(list) {
        list.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(list.id)
            lists = deleteList(list.id);
            build_page();
        });
    });
}
build_page();

function deleteItem(item_name) {
    to_return = items.filter(function(item){return item.item != item_name;});
    return to_return;
}

function deleteList(list_name) {
    to_return = lists.filter(function(list){return list != list_name;});
    return to_return;
}

document.getElementById('newListSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    let list_name = document.getElementById('newList');
    lists.push(list_name.value);
    build_page();
});



