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
   static clearBook()
   {   let books=bookStore.getBooks();
          books=[];
      localStorage.setItem('books',JSON.stringify(books));
      
     let n=document.querySelectorAll('tr').length;
      let i;
   for(i=1;i<n;i++)
   {
       document.querySelectorAll('tr')[1].remove();
   }

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
            <td>${book.date}</td>
            <td><i class="far fa-trash-alt"></i></td>
           `;
       list.appendChild(row);
    }
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
    additional();
    }

});
let deletearr =[];
additional();

function deletelement(){
    let books;
    books=bookStore.getBooks();
      
    
       let tr=document.querySelectorAll('tr');
       tr=Array.from(tr);
    
       books.splice(deletearr.indexOf(this),1);
       

    localStorage.setItem('books',JSON.stringify(books));
    
     tr[deletearr.indexOf(this)+1].remove();
     additional();

 }


 function additional ()
 {
    let dlist=document.querySelectorAll('tr');
    let arr= Array.from(dlist);
    arr.shift();
    
  

     arr.forEach((element,i) => {
          element.addEventListener("mouseover", hover);
          deletearr[i]=element.querySelectorAll('td')[4];

      });
    
      deletearr.forEach(function(element){
        element.addEventListener("click", deletelement);
        
    
    });
  
    
      function hover(e){
          e.preventDefault();
          
          this.className='list';
      }
    
 }

function clearlist() {
    bookStore.clearBook();
    additional();

}