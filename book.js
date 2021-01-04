//Book class
class Book
{
   constructor(title,author,resource,date)
   {
    this.title=title;
    this.author=author;
    this.resource=resource;
	this.date=date;
   }
}
function GoToResources()
{
    console.log("Just clicked");
    location.href="./resources.html";
}
function GoBack()
{
    location.href="./book.html";
}
//Local Storage
class bookStore
{
   static getBooks()
   {
        let books;
        if(localStorage.getItem('books')===null)
        {
            books=[];   
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
    return books;
   }
   static addBook(book)
   {
       const books=bookStore.getBooks();
       books.push(book);
       console.log(books);
       localStorage.setItem('books',JSON.stringify(books));
   }
}
class UI
{
    static displayBooks()
    {
        const books=bookStore.getBooks();
        books.forEach(book=>UI.addBooktoList(book));
    }
    static addBooktoList(book)
    { const list=document.querySelector('#resource-list');
       const totalRowCount = list.rows.length;
       const i=totalRowCount;
       const row=document.createElement('tr');
       row.setAttribute ("id",i);

       row.innerHTML=
           `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.resource}</td>
            <td>${book.date}</td>
            <td><button style="padding: 0.4em 0.8em;
    border: 2px solid blue;
    border-radius: 5px;
    background:  #5fa8d3;
    color: white;
    font-weight: 3px;
    font-size: 1em;
    font-family: 'Noto Sans', sans-serif;
    margin-left: 0.6em;
    cursor: pointer;
    outline: none;" onclick="removeRow(${i})">Remove</button></td>
                

            
           `;
             
      
     
list.appendChild(row); 
        
  }        

    // function to delete a row.
   
       

    static clearform()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#resource').value='';
		document.querySelector('#date').value='';
    }
    static alertMsg(message,name){
        const div=document.createElement('div');
        div.className=`alert alert-${name}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    } 
}
 function removeRow(oButton) {
    
        var empTab = document.getElementById('resource-list');
        var emptabb =document.getElementById(oButton);
          var items=JSON.parse(localStorage.getItem('books'));
          if (items.length==1){
             emptabb.innerHTML=" ";
             localStorage.clear();
          }
          for (var i =0; i< items.length; i++) {
    var item = items[i];
     if (i == oButton) {
        emptabb.innerHTML=" ";
       items.splice(i);

}

}
localStorage.setItem('books',JSON.stringify(items));
        
    }
document.addEventListener('DOMContentLoaded',UI.displayBooks());
document.querySelector('#book-form').addEventListener('submit', (e)=>
{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#resource').value;
	const date=document.querySelector('#date').value;
    if(title==='' || author==='' || resource===''||date===''){
    UI.alertMsg('Please fill all the fields','danger');
    }
    else{
    const book=new Book(title,author,isbn,date);
    bookStore.addBook(book);
    UI.addBooktoList(book);
    UI.alertMsg('Book added','success');
    UI.clearform();
    }
    
});

document.querySelector()

// for clearing the list
function update() {
    if (localStorage.getItem('books') === null) {
        itemJsonArray = [];
        console.log("error");
    } else {

        itemJsonArrayStr = localStorage.getItem('books');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    console.log(itemJsonArray);
    let tableBody = document.getElementById('resource-list');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                <tr>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-primary btn-sm" onclick="deleted(${index})">Delete</button></td>
                </tr>`;

    });
    tableBody.innerHTML = str;
}



   
