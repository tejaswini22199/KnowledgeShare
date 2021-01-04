
The software project for Public Quiz Management contains various forms along with programming codes. Forms (JFrames) and their event coding are given below:

## Frame:  LogIn.java
![login java](https://user-images.githubusercontent.com/59510531/103502379-0e203a80-4e77-11eb-8f83-116ceccfeb2b.png)
#### Coding of LOGIN.java
``` Java
import java.sql.*;
public class LogIn extends javax.swing.JFrame {
/** Constructor */
    public LogIn() {
        initComponents();
    }

private void loginBTNActionPerformed(java.awt.event.ActionEvent evt) {                                         
        String PWord = new String(Password.getPassword());
        String Id = ID.getText();
        try   {
            Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            stmt = conn.createStatement();
            String sql = "select * from LogIn where ID = '" + Id + "'";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            String str = rs.getString("Password");
            if(str.equals(PWord))
            {
                 Menu m = new Menu(Id);
                  m.setVisible(true);
                 this.setVisible(false);
            }
            else
            {
                 InvalidLBL.setText("Incorrect ID or Password");
            }
        } catch (Exception e) { InvalidLBL.setText("Incorrect ID or Password");}
}  

   private void regLBLMouseClicked(java.awt.event.MouseEvent evt) {                                    
        Register r = new Register();
        r.setVisible(true);
        this.setVisible(false);
}                                   
}
```

## Frame:  Register.java
![registration form](https://user-images.githubusercontent.com/59510531/103502477-52abd600-4e77-11eb-994f-e30b3308545e.png)
#### Coding of Register.java
``` java
import java.sql.*;
import javax.swing.JOptionPane;
public class Register extends javax.swing.JFrame {
/** Constructor */
    public Register() {
        initComponents();
    }
private void RegisterTFActionPerformed(java.awt.event.ActionEvent evt) {                                           
         try {
            Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            String sql;
            sql = "insert into Result values ('" + IDTF.getText() + "',0,0,0,0)";
            stmt.executeUpdate(sql);
            sql = "insert into LogIn values ( '" + IDTF.getText() + "' , '" + PasswordTf.getText() + "' )";
            stmt.executeUpdate(sql);
            stmt.close();
            conn.close();
            new Menu(IDTF.getText()).setVisible(true);
            this.setVisible(false);
        }
        catch( Exception e)
        {
             JOptionPane.showMessageDialog(null,"" + e);
        }
}                                          

public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Register().setVisible(true);
            }
        });
    }
}
```

## Frame:  Menu.java
![subject](https://user-images.githubusercontent.com/59510531/103502539-8981ec00-4e77-11eb-8ce3-59b0bf1f381e.jpg)
#### Coding for Menu.java
``` java
public class Menu extends javax.swing.JFrame {
    String ID;
        /** Constructor */
    public Menu() {
        initComponents();
    }
    public Menu(String id) {
        initComponents();
        ID = id;
    }
private void startTestBTNActionPerformed(java.awt.event.ActionEvent evt) {                                             
         String sub = null;
        if(IP.isSelected()) {
            sub = "IP";
        }
        else if(GK.isSelected()) {
            sub = "GK";
        }
         if (sub != null)
        {
            Test t = new Test(sub,ID);
            t.setVisible(true);
            this.setVisible(false);
        }
}                                            
private void jMenuItem1ActionPerformed(java.awt.event.ActionEvent evt) {
       IP.doClick();
    }
private void jMenuItem2ActionPerformed(java.awt.event.ActionEvent evt) {
        GK.doClick();
    }
private void jMenuItem5ActionPerformed(java.awt.event.ActionEvent evt) {
        System.exit(0);
    }
public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Menu().setVisible(true);
            }
        });
    }
  }
```

##  Frame:  Test.java
![quiz time](https://user-images.githubusercontent.com/59510531/103502617-c5b54c80-4e77-11eb-9b13-98409d23c7c7.jpg)
#### Coding for Test.Java
``` Java
import java.sql.*;
import javax.swing.JOptionPane;
public class Test extends javax.swing.JFrame {
    String ID;
    String Subject;
    int index =1;
    int max =0;
    int result = 0;
    char [] answers;
    /** Constructor */
    public Test()
    {
        initComponents();
    }
    public Test(String subject, String id)
    {
        initComponents();
        ID = id;
        Subject = subject;
        PrevBTN.setVisible(false);
        try
          {Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            String sql = "select max(SNo) from " + Subject;
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            max = rs.getInt(1);
            answers = new char[max];
            for(int i=0; i<max;i++) {
                  answers[i] = 'e';
              }
            rs.close();
            stmt.close();
            conn.close();
            getQues();
             }
             catch(Exception r){ JOptionPane.showMessageDialog(null,""+ r);
          }
    }
    private void getQues()
    {
        try
        {
            Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            String sql = "select * from " + Subject + " where SNo = " + index;
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();
            QuesTA.setText("\nQ" + index + ".  " + rs.getString(2));
            a.setText(rs.getString("a"));
            b.setText(rs.getString("b"));
            c.setText(rs.getString("c"));
            d.setText(rs.getString("d"));
            a.setSelected(answers[index-1] == 'a');
            b.setSelected(answers[index-1] == 'b');
            c.setSelected(answers[index-1] == 'c');
            d.setSelected(answers[index-1] == 'd');
            e.setSelected(answers[index-1] == 'e');
            rs.close();
            stmt.close();
            conn.close();
        }
         catch(Exception r){ JOptionPane.showMessageDialog(null,""+ r); }
    }
private void PrevBTNActionPerformed(java.awt.event.ActionEvent evt) {                                        
            index--;
            getQues();
            if(index == 1) {
            PrevBTN.setVisible(false);
        }
            if(index < max) {
            NextBTN.setVisible(true);
        }
}                                       
private void NextBTNActionPerformed(java.awt.event.ActionEvent evt) {                                        
            index++;
            getQues();
            if(index == max) {
            NextBTN.setVisible(false);
        }
            if(index > 1) {
            PrevBTN.setVisible(true);
        }
}                                       
private void bActionPerformed(java.awt.event.ActionEvent evt) {                                  
        answers[index-1] = 'b';
}                                 
private void ResultBTNActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try
        {
            Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            String sql = "select Result from " + Subject;
            ResultSet rs = stmt.executeQuery(sql);
            int i = 0;
            while(rs.next())
            {
                char ans = rs.getString(1).charAt(0);
                if(ans == answers[i]) {
                    result++;
                }
                i++;
            }
            float res = ((float)result * 100 ) / max;
            sql = "Select " + Subject + "Result from Result where ID = '" + ID + "'";
            rs = stmt.executeQuery(sql);
            rs.next();
            if(res > rs.getFloat(1))
            {
                sql = "update Result set " + Subject + "Result = " + res + " where ID = '" + ID + "'";
                stmt.executeUpdate(sql);
            }
            stmt.close();
            conn.close();
            new Result(res,ID).setVisible(true);
            this.setVisible(false);
        }
         catch(Exception r){ JOptionPane.showMessageDialog(null,r); }
}                                         
private void aActionPerformed(java.awt.event.ActionEvent evt) {                                  
        answers[index-1] = 'a';
    }                                 
private void cActionPerformed(java.awt.event.ActionEvent evt) {                                  
        answers[index-1] = 'c';
    }                                 
 private void dActionPerformed(java.awt.event.ActionEvent evt) {                                  
        answers[index-1] = 'd';
    }                                 
 public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Test().setVisible(true);
            }
        });}
}
```

## Frame:  Result.java
![result time](https://user-images.githubusercontent.com/59510531/103502703-175dd700-4e78-11eb-9e81-85d47e7e0229.jpg)
#### Coding of Result.java
``` Java
import java.sql.*;
import javax.swing.table.*;
import javax.swing.JOptionPane;
public class Result extends javax.swing.JFrame {
    float result;
    String ID;
    /** Creates new form Result */
    public Result() {
        initComponents();
    }
    public Result(float res, String id)
    {
        initComponents();
        result = res;
        ID = id;
        Score.setText(res + "%");
        try {
             Class.forName("java.sql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/quizdb", "root", "kvuc");
            Statement stmt = conn.createStatement();
            String sql = "select * from Result where ID = '" + ID + "'";
            ResultSet rs = stmt.executeQuery(sql);
            Object[] newrow = new Object[5];
            newrow[0] = "MAX MARKS";
            rs.next();
            for(int i=1; i<=4;i++) {
                newrow[i] = rs.getString(i+1);
            }
            DefaultTableModel tm = (DefaultTableModel)scoreTBL.getModel();
            tm.addRow(newrow);
        }
         catch (Exception e) { JOptionPane.showMessageDialog(null,"" + e);
        }
    }
private void BackBTNActionPerformed(java.awt.event.ActionEvent evt) {                                        
        new Menu(ID).setVisible(true);
        this.setVisible(false);
}                                       
    private void exitBTNActionPerformed(java.awt.event.ActionEvent evt) {                                        
           this.dispose();
}                                       
public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Result().setVisible(true);
            }
        });

}
}

```
