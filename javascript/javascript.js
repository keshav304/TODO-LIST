function getAndUpdate(){
    console.log("Updating List...");
    // get the titile of the todo
    tit = document.getElementById('title').value;

    //get the description of the todo
    desc = document.getElementById('description').value;

    //checking if local storage is empty or not
    if (localStorage.getItem('itemsJson')==null){
        // if local storage is empty, create an array and save the title and description of the todo
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);

        //save the array in the local storage
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else{
        //if the local storage is not empty get the json of local array and parse it and store in a array
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        //add the new title and description in the array
        itemJsonArray.push([tit, desc]);

        //save the array in the local storage
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    //function for updating the list
    update();
}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();
function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}
function clearStorage(){
    if (confirm("Do you areally want to clear?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update()
    }
}