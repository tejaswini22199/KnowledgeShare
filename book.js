//Book class
class Book
{
   constructor(title,author,resource)
   {
    this.title=title;
    this.author=author;
    this.resource=resource;
   }
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
    {
       const list=document.querySelector('#resource-list');
       const row=document.createElement('tr');
       row.innerHTML=
           `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.resource}</td>
           `;
       list.appendChild(row);
    }
    static clearform()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#resource').value='';
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
document.addEventListener('DOMContentLoaded',UI.displayBooks());
document.querySelector('#book-form').addEventListener('submit', (e)=>
{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#resource').value;
    if(title==='' || author==='' || resource===''){
    UI.alertMsg('Please fill all the fields','danger');
    }
    else{
    const book=new Book(title,author,isbn);
    bookStore.addBook(book);
    UI.addBooktoList(book);
    UI.alertMsg('Book added','success');
    UI.clearform();
    }
    
});
document.querySelector()