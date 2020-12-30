from tkinter import *
root=Tk()
root.title("Add & Substract")
root.config(bg="pink")

class Mywindow:
    def __init__(self,master):
        self.lbl1=Label(master,text='First Number',font=("arial",15,"bold"),bg="pink")
        self.lbl1.place(x=10,y=50)

        self.lbl2=Label(master,text='Second Number',font=("arial",15,"bold"),bg="pink")
        self.lbl2.place(x=10,y=100)

        self.lbl3=Label(master,text='Result',font=("arial",15,"bold"),bg="pink")
        self.lbl3.place(x=10,y=200)

        self.t1=Entry(bd=3,font=("arial",12,"bold"))
        self.t1.place(x=200,y=50)

        self.t2=Entry(bd=3,font=("arial",12,"bold"))
        self.t2.place(x=200,y=100)

        self.t3=Entry(bd=3,font=("arial",12,"bold"))
        self.t3.place(x=200,y=200)

        self.b1=Button(master,width=10,text='Add',command=self.add,font=("arial",10,"bold"),bg="yellow")
        self.b1.place(x=200,y=150)

        self.b1=Button(master,width=10,text='substract',command=self.sub,font=("arial",10,"bold"),bg="yellow")
        self.b1.place(x=300,y=150)

    def add(self):
        self.t3.delete(0,'end')
        num1=int(self.t1.get())
        num2=int(self.t2.get())
        result=num1+num2
        self.t3.insert(END,str(result))

    def sub(self):
        self.t3.delete(0,'end')
        num1=int(self.t1.get())
        num2=int(self.t2.get())
        result=num1-num2
        self.t3.insert(END,str(result))

mywin=Mywindow(root)
root.mainloop()



