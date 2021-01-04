The software project for Public Library Management contains various forms along with programming codes. Forms (JFrames) and their event coding are given below:

## Frame:  MainUI.java
![main](https://user-images.githubusercontent.com/59510531/103482730-87347900-4e08-11eb-9907-27b401e56495.png)
#### Coding for  MainUI.java
``` Java
  /**MainUI.java**/
public class MainUI extends javax.swing.JFrame {
    /** Creates new form MainUI */
    public MainUI() {
        initComponents();
    }
    private void mnuPubActionPerformed(java.awt.event.ActionEvent evt) {                                        
        //this.setVisible(false);
        new pubUI().setVisible(true);
        new pubUI().getAlignmentX();
    }                                        
    private void mnuQuitActionPerformed(java.awt.event.ActionEvent evt) {                                         
        System.exit(0);
    }                                       
    private void mnuPModActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new PubEditUI().setVisible(true);
    }                                        
    private void mnuPDelActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new PubDelUI().setVisible(true);
    }                                        
    private void mnuPNavActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new PubNavUI().setVisible(true);
    }                                        
    private void mnuLibActionPerformed(java.awt.event.ActionEvent evt) {                                        
        new LibUI().setVisible(true);
    }                                       
    private void mnuMembActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new MembUI().setVisible(true);
    }                                        
    private void mnuMModActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new MembEditUI().setVisible(true);
    }                                        
    private void mnuMDelActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new MembDelUI().setVisible(true);
    }                                        
    private void mnuMNavActionPerformed(java.awt.event.ActionEvent evt) {                                         
        new MembNavUI().setVisible(true);
    }                                        
    private void mnuIssueActionPerformed(java.awt.event.ActionEvent evt) {                                          
        new IssueUI().setVisible(true);
    }                                         
    private void mnuReturnActionPerformed(java.awt.event.ActionEvent evt) {                                           
        new ReturnUI().setVisible(true);
    }                                          
    private void mnuABListActionPerformed(java.awt.event.ActionEvent evt) {                                           
        new ABListUI().setVisible(true);
    }                                          
    private void mnuIBListActionPerformed(java.awt.event.ActionEvent evt) {                                           
        new IBListUI().setVisible(true);
    }                                          
    private void mnuMListActionPerformed(java.awt.event.ActionEvent evt) {                                          
        new MListUI().setVisible(true);
    }      
    private void mnuLibEditActionPerformed(java.awt.event.ActionEvent evt)  {                                            
        // TODO add your handling code here:
        new LibEditUI().setVisible(true);
    }                                          
    private void jMenuItem1ActionPerformed(java.awt.event.ActionEvent evt) {                                           
        // TODO add your handling code here:
        new LibDelUI().setVisible(true);
    }                                                                             
    /**    * @param args the command line arguments     */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MainUI().setVisible(true);
            }
        });
    }}
```

## Frame:  PubUI.java
![publish](https://user-images.githubusercontent.com/59510531/103482768-bea32580-4e08-11eb-8ee1-9c37b8caaf65.png)
#### Coding of pubUI.java
``` Java
import java.sql.*;
import javax.swing.JOptionPane;
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        new MainUI().setVisible(true);
    }                                       
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtPno.setEditable(false);
        // Deactivate the Save button when form loads
        cmdSave.setEnabled(false);
    }                                      
    private void cmdNewActionPerformed(java.awt.event.ActionEvent evt) {                                       
        // Activate the Save button when New button clicked
        cmdSave.setEnabled(true);
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
            DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            Statement stmt = null;
            ResultSet rs = null;        // ResultSet for publisher table.
            String SQL = "SELECT * FROM publisher";
            stmt = con.createStatement();   // Connection string for  ResultSet - rs.
            rs = stmt.executeQuery(SQL);
            int pno = 1;
            int PID=0;
            while (rs.next()) {
                PID = rs.getInt("pub_id");
                pno++;
            }
            PID++;
            pno = PID;
            txtPno.setText(Integer.toString(pno));
            txtPName.setFocusable(true);
            con.close();
            rs.close();
            stmt.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    private void cmdSaveActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            Statement stmt = null;
            ResultSet rs = null;
            String SQL = "SELECT * FROM publisher";
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Pno = Integer.parseInt(txtPno.getText());
            String PName = txtPName.getText();
            String PAdd = txtPAdd.getText();
            String Pph1 = txtPh1.getText();
            String Pph2 = txtPh2.getText();
            char PStatus = 'Y';
            int code = JOptionPane.showConfirmDialog(this, "Are you sure to add?", "Confirmation Dialog Box", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.INFORMATION_MESSAGE);
            if (code == JOptionPane.YES_OPTION) {
                String strSQL = "INSERT INTO Publisher(pub_id, pub_name, pub_address, pub_phone1, pub_phone2, status) VALUES ("+(Pno)+", '"+(PName)+"', '"+(PAdd)+"', '"+(Pph1)+"', '"+(Pph2)+"', '"+(PStatus)+"')";
                int rowsEffected = stmt.executeUpdate(strSQL);
                JOptionPane.showMessageDialog(this, "Record added successfully into Publisher table");
            }
            con.close();
            stmt.close();
            rs.close();
            cmdSave.setEnabled(false);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                       
    private void cmdClearActionPerformed(java.awt.event.ActionEvent evt) {                                         
        txtPno.setText("");
        txtPName.setText("");
        txtPAdd.setText("");
        txtPh1.setText("");
        txtPh2.setText("");
        cmdSave.setEnabled(false);
    }                                        
    private void cmdEditActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        new PubEditUI().setVisible(true);
    }                                       
    /**    * @param args the command line arguments    */
    /*public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new pubUI().setVisible(true);
                new pubUI().setSize(500, 500);
            }
        });
    }*/
}
```
## Frame:  PubEditUI.java
![member edition](https://user-images.githubusercontent.com/59510531/103482815-f4e0a500-4e08-11eb-8d81-acfc25bb9011.png)
#### Coding for PubEditUI.java
``` Java
/*  * PubEditUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class PubEditUI extends javax.swing.JFrame {
    /** Creates new form PubEditUI */
    public PubEditUI() {
        initComponents();
    }
 private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtPno.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            Statement stmt = null;
            ResultSet rs = null;
            String SQL = "SELECT * FROM Publisher";
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Pno = rs.getString("pub_id");
                String PName = rs.getString("pub_name");
                // To make the publisher no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Pno.length() < 4)
                {
                    int x = Pno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Pno = Pno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Pno + "- " + PName);
            }
            jList1.setModel(dModel);
            con.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MPub = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as publisher ID into a variable
        String PubN =MPub.trim().substring(0, 3);
        String query = "SELECT * FROM Publisher WHERE pub_Id = " + PubN + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                //PubN = rs.getString("pub_no");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                txtPno.setEditable(false);
                // Close the operational object for Student
                con.close();
                stmt.close();
                rs.close();
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Publisher table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                   
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        //new MainUI().setVisible(true);
    }                                       
    private void cmdUpdateActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            // Connect to MySQL database
            // Don't forget to import the two packages
            //  import java.sql.*;
            //  import javax.swing.JOptionPane;
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            Statement stmt = null;
            ResultSet rs = null;
            String SQL = "SELECT * FROM Publisher";
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int pno = Integer.parseInt(txtPno.getText().trim());
            String PubName = txtPName.getText();
            String PubAdd = txtPAdd.getText();
            String PubPh1 = txtPh1.getText();
            String PubPh2 = txtPh2.getText();
            String PStatus = txtStatus.getText();
            String strSQL = "Update publisher set pub_name ='"+(PubName)+"',pub_address = '"+(PubAdd)+"', pub_phone1 = '"+(PubPh1)+"', pub_phone2 = '"+(PubPh2)+"', status = '"+(PStatus)+"' where pub_id = " + (pno);
            int rowsEffected = stmt.executeUpdate(strSQL);
            if (rowsEffected == 0)
                JOptionPane.showMessageDialog(this, "Record does not exists");
            else
                JOptionPane.showMessageDialog(this,"Record modified");
            con.close();
            stmt.close();
            rs.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                         
    /**    * @param args the command line arguments    */
    /*public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new PubEditUI().setVisible(true);
            }
        });
    }*/
}
```
## Frame:  PubDelUI.java
![publisher data](https://user-images.githubusercontent.com/59510531/103482844-31ac9c00-4e09-11eb-994c-96dcd007d7d9.png)
#### Coding for PubDelUI.Java
``` Java
/* PubDelUI.java */
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class PubDelUI extends javax.swing.JFrame {
    /** Creates new form PubDelUI */
    public PubDelUI() {
        initComponents();
    }
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Publisher";
    private void cmdDeleteActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
            DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int pno = Integer.parseInt(txtPno.getText().trim());
            // Steps to confirm deletion
            int opt = JOptionPane.showConfirmDialog(null, "Are you sure to delete this record ?");
            if (opt == JOptionPane.YES_OPTION)
            {
                try {
                    char stb = 'N';  // Member table
                    String strSQL = "Update publisher set status ='"+(stb)+"' where pub_id = " + (pno);
                    int rowsEffected = stmt.executeUpdate(strSQL);
                    if (rowsEffected == 0)
                        JOptionPane.showMessageDialog(this, "Record does not exists");
                    else
                    {
                        JOptionPane.showMessageDialog(this,"Record Deleted");
                        // Text boxes cleared
                        txtPno.setText("");
                        txtPName.setText("");
                        txtPAdd.setText("");
                        txtPh1.setText("");
                        txtPh2.setText("");
                        txtStatus.setText("");
                        txtPno.setEditable(true);
                    }
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(null, "Unable to delete");
                }
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                         
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        //new MainUI().setVisible(true);
}                                       
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MPub = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as roll number into a variable
        String PubN =MPub.trim().substring(0, 3);
        String query = "SELECT * FROM Publisher WHERE pub_Id = " + PubN + ";";
        try {
            // Connect to MySQL database
            // Don't forget to import the two packages
            //  import java.sql.*;
            //  import javax.swing.JOptionPane;
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                //PubN = rs.getString("pub_no");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                txtPno.setEditable(false);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Student table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtPno.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Pno = rs.getString("pub_id");
                String PName = rs.getString("pub_name");
                // To make the publisher no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Pno.length() < 4)
                {
                    int x = Pno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Pno = Pno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Pno + "- " + PName);
            }
            jList1.setModel(dModel);
            con.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    /**    * @param args the command line arguments    */
    /*public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new PubDelUI().setVisible(true);
            }
        });
    }*/
  }
  ```
## Frame: PubNavUI.java

![publisher record](https://user-images.githubusercontent.com/59510531/103482867-67518500-4e09-11eb-835c-46cf73801cf3.png)

#### Coding of PubNavUI.java
``` Java
/* PubNavUI.java  */
import java.sql.*;
import javax.swing.JOptionPane;
public class PubNavUI extends javax.swing.JFrame {
    /** Creates new form PubNavUI */
    public PubNavUI() {
        initComponents();
    }
// Global variables
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM publisher";
    public void disable_textfields() {
        txtPno.setEditable(false);
        txtPName.setEditable(false);
        txtPAdd.setEditable(false);
        txtPh1.setEditable(false);
        txtPh2.setEditable(false);
        txtStatus.setEditable(false);
    }
    private void cmdFirstActionPerformed(java.awt.event.ActionEvent evt) {                                         
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.first()) {
                String PubN = rs.getString("pub_id");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(true);
            } else {
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(false);
                JOptionPane.showMessageDialog(this, "Rhere is no record in table", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                        
    private void cmdNextActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.next()) {
                String PubN = rs.getString("pub_id");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(true);
            } else {
                cmdNext.setEnabled(false);
                JOptionPane.showMessageDialog(this, "You are at last record position", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       
    private void cmdPrevActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.previous()) {
                String PubN = rs.getString("pub_id");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(true);
            } else {
                cmdPrev.setEnabled(false);
                JOptionPane.showMessageDialog(this, "You are at first position", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void cmdLastActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.last()) {
                String PubN = rs.getString("pub_id");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(false);
            } else {
                JOptionPane.showMessageDialog(this, "You are already at last record", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        disable_textfields();
        try {
            // Connect to MySQL database
            // Don't forget to import the two packages
            // import java.sql.*;
            // import javax.swing.JOptionPane;
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            if (rs.first())
            {
                String PubN = rs.getString("pub_id");
                String PubName = rs.getString("pub_name");
                String PubAdd = rs.getString("pub_address");
                String PubPh1 = rs.getString("pub_phone1");
                String PubPh2 = rs.getString("pub_phone2");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtPno.setText(PubN);
                txtPName.setText(PubName);
                txtPAdd.setText(PubAdd);
                txtPh1.setText(PubPh1);
                txtPh2.setText(PubPh2);
                txtStatus.setText(PStatus);
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(true);
            }
            else
            {
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(false);
                JOptionPane.showMessageDialog(this, "There is no record in table", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new PubNavUI().setVisible(true);
            }
        });
    }
  }
```
##  Frame:  LibUI.java
![LIBRARY CONSOLE](https://user-images.githubusercontent.com/59510531/103482917-b13a6b00-4e09-11eb-8542-2002e348dc9e.png)
#### Coding for LibUI.java
``` Java
/*  * LibUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultComboBoxModel;
public class LibUI extends javax.swing.JFrame {
    /** Creates new form LibUI */
    public LibUI() {
        initComponents();
    }
   Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Lib";
    // for table Publisher
    Statement stmt1 = null;
    ResultSet rs1 = null;
    String SQL1 = "SELECT * FROM publisher";
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
    }                                       
    private void cmdEditActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        new LibEditUI().setVisible(true);
}                                       
    private void cmdSaveActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
            DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Acno = Integer.parseInt(txtAcno.getText().trim());
            String bTitle = txtBTitle.getText();
            String Auth1 = txtAuth1.getText();
            String Auth2 = txtAuth2.getText();
            // Creating a String object pName
            String pName = (String) jComboBox1.getSelectedItem();
            // Extract the first 4 characters as publisher number into a variable
            String PubNo = String.valueOf(pName.substring(0, 3).trim());
            int pno = Integer.parseInt(PubNo);
            jLabel10.setText(""+pno);
            float Price = Float.parseFloat(txtPrice.getText());
            int pages = Integer.parseInt(txtPages.getText());
            int edition = Integer.parseInt(txtEdition.getText());
            String Pdate = txtPDate.getText();
            char BStatus = 'Y';
            int code = JOptionPane.showConfirmDialog(this, "Are you sure to add?", "Confirmation Dialog Box", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.INFORMATION_MESSAGE);
            if (code == JOptionPane.YES_OPTION) {
                String strSQL = "INSERT INTO Lib(acc_no, btitle, author1, author2, pub_id, price, pdate, pages, edition, status) VALUES ("+(Acno)+", '"+(bTitle)+"', '"+(Auth1)+"', '"+(Auth2)+"', "+(pno)+", "+(Price)+", '"+(Pdate)+"', "+(pages)+", "+(edition)+", '"+(BStatus)+"')";
                int rowsEffected = stmt.executeUpdate(strSQL);
                JOptionPane.showMessageDialog(this, "Record added successfully into Lib table");
            }
            cmdSave.setEnabled(false);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                       
    private void cmdNewActionPerformed(java.awt.event.ActionEvent evt) {                                       
        // Activate the Save button when New button pressed
        cmdSave.setEnabled(true);
        DefaultComboBoxModel cModel = (DefaultComboBoxModel) jComboBox1.getModel();
        cModel.removeAllElements();
        txtStatus.setEditable(false);
        // Activate the Save button when New button clicked
        cmdSave.setEnabled(true);
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();   // Connection string for  ResultSet - rs.
            rs = stmt.executeQuery(SQL);
            int acno=0, ACNO = 0;
            while (rs.next()) {
                ACNO = rs.getInt("acc_no");
            }
            ACNO++;
            acno = ACNO;
            txtAcno.setText(Integer.toString(acno));
            stmt1 = con.createStatement();   // To list publishers in JComboBox1 component
            rs1 = stmt1.executeQuery(SQL1);
            while (rs1.next()) {
                String pubno = rs1.getString("pub_id");
                String pubName = rs1.getString("pub_name");
                // To make the publisher no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event
                txtStatus.setText("Y"); // Because it is a new book, when it will be issue,
                // it's status will be N.
                if (pubno.length() < 4)
                {
                    int x = pubno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        pubno = pubno + " ";
                        nl--;
                    }
                }
                cModel.addElement(pubno + "- " + pubName);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
}                                      
    private void cmdClearActionPerformed(java.awt.event.ActionEvent evt) {                                         
        DefaultComboBoxModel cModel = (DefaultComboBoxModel) jComboBox1.getModel();
        txtAcno.setText("");
        txtBTitle.setText("");
        txtAuth1.setText("");
        txtAuth2.setText("");
        cModel.removeAllElements();
        txtPrice.setText("");
        txtPages.setText("");
        txtEdition.setText("");
        txtPDate.setText("");
        txtStatus.setText("");
        cmdSave.setEnabled(false);
}                                        
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtAcno.setEditable(false);
        // Deactivate the Save button when form loads
        cmdSave.setEnabled(false);
    }                                      
    private void cmdDeleteActionPerformed(java.awt.event.ActionEvent evt) {                                          
        this.setVisible(false);
        new LibDelUI().setVisible(true);
    }                                         
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new LibUI().setVisible(true);
            }
        });
    }
  }
  ```
## Frame:  LibEditUI.java
![LIBRARY BOOK MODIFICATION](https://user-images.githubusercontent.com/59510531/103482944-e34bcd00-4e09-11eb-9b59-3a3c9e84a5c9.png)
#### Coding for LibEditUI.java
```  Java
/* * LibEditUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
import javax.swing.DefaultComboBoxModel;
public class LibEditUI extends javax.swing.JFrame {
    /** Creates new form LibEditUI */
    public LibEditUI() {
        initComponents();
    }

    // for table Publisher
    Statement stmt1 = null;
    ResultSet rs1 = null;
    String SQL1 = "SELECT * FROM publisher";
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Lib";
    private void cmdUpdateActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
            DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Acno = Integer.parseInt(txtAcno.getText().trim());
            String bTitle = txtBTitle.getText();
            String Auth1 = txtAuth1.getText();
            String Auth2 = txtAuth2.getText();
            // Creating a String object pName
            String pName = (String) jComboBox1.getSelectedItem();
            // Extract the first 4 characters as publisher number into a variable
            String NPubNo = String.valueOf(pName.substring(0, 3).trim());
            int Npno = Integer.parseInt(NPubNo);
            int PID = Integer.parseInt(txtPID.getText());
            if (Npno != PID)
                PID = Npno;
            float Price = Float.parseFloat(txtPrice.getText());
            int pages = Integer.parseInt(txtPages.getText());
            int edition = Integer.parseInt(txtEdition.getText());
            String Pdate = txtPDate.getText();
            String BStatus = txtStatus.getText();
            String strSQL = "Update Lib set btitle ='"+(bTitle)+"', author1 = '"+(Auth1)+"', author2 = '"+(Auth2)+"', pub_id = "+(PID)+", price = "+(Price)+", pdate = '"+(Pdate)+"', pages = "+(pages)+ ", edition = "+(edition)+", status = '"+(BStatus)+"' where acc_no = " + (Acno);
            int rowsEffected = stmt.executeUpdate(strSQL);
            if (rowsEffected == 0)
                JOptionPane.showMessageDialog(this, "Record does not exists");
            else
                JOptionPane.showMessageDialog(this,"Record modified");
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                         
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtAcno.setEditable(false);
        txtPID.setEditable(false);
        txtStatus.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Ano = rs.getString("acc_no");
                String BTitle = rs.getString("btitle");
                // To make the Accession no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Ano.length() < 4)
                {
                    int x = Ano.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Ano = Ano + " ";
                        nl--;
                    }
                }
                dModel.addElement(Ano + "- " + BTitle);
            }
            jList1.setModel(dModel);
            // To list the publisher id and name into JComboBox1.
            DefaultComboBoxModel cModel = (DefaultComboBoxModel) jComboBox1.getModel();
            cModel.removeAllElements();
            stmt1 = con.createStatement();   // To list publishers in JComboBox1 component
            rs1 = stmt1.executeQuery(SQL1);
            while (rs1.next()) {
                String pubno = rs1.getString("pub_id");
                String pubName = rs1.getString("pub_name");
                // To make the publisher no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event
                txtStatus.setText("Y"); // Because it is a new book, when it will be issue,
                // it's status will be N.
                if (pubno.length() < 4)
                {
                    int x = pubno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        pubno = pubno + " ";
                        nl--;
                    }
                }
                cModel.addElement(pubno + "- " + pubName);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
    }                                       
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MBook = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Accession number into a variable
        String Acno =MBook.trim().substring(0, 3);
        String query = "SELECT * FROM Lib WHERE acc_no = " + Acno + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String bTitle = rs.getString("btitle");
                String Auth1 = rs.getString("author1");
                String Auth2 = rs.getString("author2");
                String PID = rs.getString("pub_id");
                String Price = rs.getString("price");
                String PDate = rs.getString("pdate");
                String pages = rs.getString("pages");
                String edition = rs.getString("edition");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtAcno.setText(Acno);
                txtBTitle.setText(bTitle);
                txtAuth1.setText(Auth1);
                txtAuth2.setText(Auth2);
                txtPID.setText(PID);
                txtPrice.setText(Price);
                txtPDate.setText(PDate);
                txtPages.setText(pages);
                txtEdition.setText(edition);
                txtStatus.setText(PStatus);
                // Close the operational object for Student
                con.close();
                stmt.close();
                rs.close();
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Student table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                   

    /**    * @param args the command line arguments    */
/*    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new LibEditUI().setVisible(true);
            }
        });
    }*/
  }
  ```
## Frame:  LibDelUI.java
![LIBRARY BOOK DELETION](https://user-images.githubusercontent.com/59510531/103482979-155d2f00-4e0a-11eb-901b-392f7653c896.png)
#### Coding of LibDelUI.Java
```  Java
/* * LibDelUI.java **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class LibDelUI extends javax.swing.JFrame {
    /** Creates new form LibDelUI */
    public LibDelUI() {
        initComponents();
    }
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Lib";
    private void cmdDeleteActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Ano = Integer.parseInt(txtAcno.getText().trim());
            // Steps to confirm deletion
            int opt = JOptionPane.showConfirmDialog(null, "Are you sure to delete this record ?");
            if (opt == JOptionPane.YES_OPTION)
            {
                try {
                    if (txtStatus.getText().contains("Y"))
                    {
                            String strSQL = "Delete from Lib where acc_no = " + (Ano);
                            int rowsEffected = stmt.executeUpdate(strSQL);
                            if (rowsEffected == 0)
                                JOptionPane.showMessageDialog(this, "Record does not exists");
                            else
                            {
                                JOptionPane.showMessageDialog(this,"Record Deleted");
                            }
                    }
                    else
                        JOptionPane.showMessageDialog(this,"Record cannot be deleted, because status is 'N'");
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(null, "Unable to delete");
                }
            }
            con.close();
            stmt.close();
            rs.close();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                         
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MBook = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Accession number into a variable
        String Acno =MBook.trim().substring(0, 3);
        String query = "SELECT * FROM Lib WHERE acc_no = " + Acno + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String bTitle = rs.getString("btitle");
                String Auth1 = rs.getString("author1");
                String Auth2 = rs.getString("author2");
                String PID = rs.getString("pub_id");
                String Price = rs.getString("price");
                String PDate = rs.getString("pdate");
                String pages = rs.getString("pages");
                String edition = rs.getString("edition");
                String PStatus = rs.getString("status");
                // Displaying the contents in respective text boxes.
                txtAcno.setText(Acno);
                txtBTitle.setText(bTitle);
                txtAuth1.setText(Auth1);
                txtAuth2.setText(Auth2);
                txtPID.setText(PID);
                txtPrice.setText(Price);
                txtPDate.setText(PDate);
                txtPages.setText(pages);
                txtEdition.setText(edition);
                txtStatus.setText(PStatus);
                // Close the operational object for Student
                con.close();
                stmt.close();
                rs.close();
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Student table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtAcno.setEditable(false);
        txtPID.setEditable(false);
        txtStatus.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Ano = rs.getString("acc_no");
                String BTitle = rs.getString("btitle");
                // To make the Accession no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Ano.length() < 4)
                {
                    int x = Ano.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Ano = Ano + " ";
                        nl--;
                    }
                }
                dModel.addElement(Ano + "- " + BTitle);
            }
            jList1.setModel(dModel);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new LibDelUI().setVisible(true);
            }
        });
    }
  }
  ```
## Frame:  IssueUI.java
![BOOK ISSUE FORM](https://user-images.githubusercontent.com/59510531/103483002-40e01980-4e0a-11eb-91fa-cc342e2543ee.png)
#### Coding for IssueUI.java
``` Java
/* * IssueUI.java **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class IssueUI extends javax.swing.JFrame {
    /** Creates new form IssueUI */
    public IssueUI() {
        initComponents();
    Statement stmt = null;
    ResultSet rs = null;
    char st1 = 'N';
    char ms = 'Y';
  String SQL = "SELECT * FROM Member WHERE mem_issue = '" + st1 + "' and mem_status ='" + ms + "'";
    Statement stmt1 = null;
    ResultSet rs1 = null;
    char st = 'Y';  // Lib table
    String SQL1 = "SELECT * FROM Lib WHERE status = '" + st + "';";


    Statement stmt2 = null;
    ResultSet rs2 = null;
    String SQL2 = "SELECT * FROM Missue";
    Statement stmt3 = null;
    ResultSet rs3 = null;
    String SQL3 = "SELECT * FROM Tissue";
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MembNo = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Member No into a variable
        String Mno =MembNo.trim().substring(0, 3);
        String query = "SELECT * FROM Member WHERE memb_no = " + (Mno) + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String MName = rs.getString("memb_name");
                String MDate = rs.getString("mdate");
                String MStatus = rs.getString("mem_status");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMDate.setText(MDate);
                txtMStatus.setText(MStatus);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Member table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtMNo.setEditable(false);
        txtMName.setEditable(false);
        txtMDate.setEditable(false);
        txtMStatus.setEditable(false);
        txtAcno.setEditable(false);
        txtBTitle.setEditable(false);
        txtAuth1.setEditable(false);
        txtPID.setEditable(false);
        txtStatus.setEditable(false);
        // dModel to perform DefaultListModel for Member
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control for member
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Listing Members
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                // To make the Member no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Mno.length() < 4)
                {
                    int x = Mno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Mno = Mno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Mno + "- " + MName);
            }
            jList1.setModel(dModel);
            // cModel to perform DefaultListModel for Library
            // method operations
            DefaultListModel cModel = (DefaultListModel) jList2.getModel();
            // Method to add elements into jList1 control for Library
            cModel.clear();
            // Listing books
            stmt1 = con.createStatement();
            rs1 = stmt1.executeQuery(SQL1);
            while (rs1.next()) {
                String Ano = rs1.getString("acc_no");
                String BTitle = rs1.getString("btitle");
                // To make the Accession no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Ano.length() < 4)
                {
                    int x = Ano.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Ano = Ano + " ";
                        nl--;
                    }
                }
                cModel.addElement(Ano + "- " + BTitle);
            }
            jList2.setModel(cModel);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
    }                                       
    private void jList2MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MBook = (String) jList2.getSelectedValue();
        // Extract the first 4 characters as Accession number into a variable
        String Acno =MBook.trim().substring(0, 3);
        String query = "SELECT * FROM Lib WHERE acc_no = " + Acno + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt1 = con.createStatement();
            rs1 = stmt1.executeQuery(query);
            if (rs1.next()) {
                String bTitle = rs1.getString("btitle");
                String Auth1 = rs1.getString("author1");
                String PID = rs1.getString("pub_id");
                String PStatus = rs1.getString("status");
                // Displaying the contents in respective text boxes.
                txtAcno.setText(Acno);
                txtBTitle.setText(bTitle);
                txtAuth1.setText(Auth1);
                txtPID.setText(PID);
                txtStatus.setText(PStatus);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Libdent table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                   
    private void cmdIssueActionPerformed(java.awt.event.ActionEvent evt) {                                         
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Missue table
            stmt2 = con.createStatement();
            rs2 = stmt.executeQuery(SQL);

            // Tissue table
            stmt3 = con.createStatement();
            rs3 = stmt.executeQuery(SQL);
            int Acno = Integer.parseInt(txtAcno.getText().trim());
            int Mno = Integer.parseInt(txtMNo.getText().trim());
            String idt = txtIDate.getText();
            String rdt = idt;  // Temporarily assigned for testing purpose
            int code = JOptionPane.showConfirmDialog(this, "Are you sure to add?", "Confirmation Dialog Box", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.INFORMATION_MESSAGE);
            if (code == JOptionPane.YES_OPTION) {
                // Record updated into Missue and Tissue tables
                String strSQL = "INSERT INTO Missue(acc_no, memb_no, idate, rdate) VALUES ("+(Acno)+", "+(Mno)+", '"+(idt)+"', '"+(rdt)+"')";
                String strSQL1 = "INSERT INTO Tissue(acc_no, memb_no, idate, rdate) VALUES ("+(Acno)+", "+(Mno)+", '"+(idt)+"', '"+(rdt)+"')";
                stmt2.executeUpdate(strSQL);
                stmt3.executeUpdate(strSQL1);
                // Change the status as library book issued
                char sta = 'N';  // Lib table
                String strSQLa = "Update Lib set status ='"+(sta)+"' where acc_no = " + (Acno);
                stmt1.executeUpdate(strSQLa);
                // Change the status as Member has a book
                char stb = 'Y';  // Member table
                String strSQLb = "Update Member set mem_issue ='"+(stb)+"' where memb_no = " + (Mno);
                stmt.executeUpdate(strSQLb);
                JOptionPane.showMessageDialog(this, "Record update successfully");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                        
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new IssueUI().setVisible(true);
            }
        });
      }
    }
  }
  ```
## Frame:  ReturnUI.java
![LIBRARY BOOK RETURN](https://user-images.githubusercontent.com/59510531/103483031-800e6a80-4e0a-11eb-81a3-3f760f8b7263.png)
#### Coding for ReturnUI.java
``` Java
/* * ReturnUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class ReturnUI extends javax.swing.JFrame {
    /** Creates new form ReturnUI */
    public ReturnUI() {
        initComponents();
    }
Statement stmt = null;
    ResultSet rs = null;
    char st1 = 'Y';
    String SQL = "SELECT * FROM Member WHERE mem_issue = '" + st1 + "';";
    Statement stmt1 = null;
    ResultSet rs1 = null;
    char st = 'Y';  // Lib table
    String SQL1 = "SELECT * FROM Lib WHERE status = '" + st + "';";
    Statement stmt2 = null;
    ResultSet rs2 = null;
    String SQL2 = "SELECT * FROM Missue";
    Statement stmt3 = null;
    ResultSet rs3 = null;
    String SQL3 = "SELECT * FROM Tissue";
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MembNo = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Member No into a variable
        String Mno =MembNo.trim().substring(0, 3);
        String query = "SELECT * FROM Member WHERE memb_no = " + (Mno) + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String MName = rs.getString("memb_name");
                String MDate = rs.getString("mdate");
                String MStatus = rs.getString("mem_status");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMDate.setText(MDate);
                txtMStatus.setText(MStatus);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Member table");
            }
            // Extrating the Acc_no from Tissue table to find book details in Lib table
            String query1 = "SELECT * FROM Tissue WHERE memb_no = " + (Mno) + ";";
            // Create SQL statement and execute query.
            stmt3 = con.createStatement();
            rs3 = stmt3.executeQuery(query1);
            int ACno = 0;
            if (rs3.next()) {
                ACno = rs3.getInt("acc_no");
                txtAcno.setText(String.valueOf(ACno));
            }
            // Extrating the Library details for Acc_no from Lib table
            String query2 = "SELECT * FROM Lib WHERE acc_no = " + (ACno) + ";";
            // Create SQL statement and execute query.
            stmt1 = con.createStatement();
            rs1 = stmt1.executeQuery(query2);
            String BTitle, Auth;
            if (rs1.next()) {
                BTitle = rs1.getString("btitle");
                Auth = rs1.getString("author1");
                txtBTitle.setText(BTitle);
                txtAuth.setText(Auth);
                jLabel9.setText("Issued");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtMNo.setEditable(false);
        txtMName.setEditable(false);
        txtMDate.setEditable(false);
        txtMStatus.setEditable(false);
        txtAcno.setEditable(false);
        txtBTitle.setEditable(false);
        txtAuth.setEditable(false);
        // dModel to perform DefaultListModel for Member
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control for member
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Listing Members
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                // To make the Member no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Mno.length() < 4)
                {
                    int x = Mno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Mno = Mno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Mno + "- " + MName);
            }
            jList1.setModel(dModel);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       

    private void cmdReturnActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Missue table
            int Mno = 0, Acno = 0;
            Mno = Integer.parseInt(txtMNo.getText().trim());
            Acno = Integer.parseInt(txtAcno.getText().trim());
            // Steps to confirm return
            int opt = JOptionPane.showConfirmDialog(null, "Are you sure to return this book ?");
            if (opt == JOptionPane.YES_OPTION)
            {
                String strSQLr = "Delete from Tissue where memb_no = " + (Mno);
                stmt3.executeUpdate(strSQLr);
                // Change the status as library book issued
                char sta = 'Y';  // Lib table
                String strSQLa = "Update Lib set status ='"+(sta)+"' where acc_no = " + (Acno);
                stmt1.executeUpdate(strSQLa);
                // Change the status as Member has a book
                char stb = 'N';  // Member table
                String strSQLb = "Update Member set mem_issue ='"+(stb)+"' where memb_no = " + (Mno);
                stmt.executeUpdate(strSQLb);
                JOptionPane.showMessageDialog(this, "Thanks for returning book");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                         
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new ReturnUI().setVisible(true);
            }
        });
    }
  }
  ```
## Frame:  MembUI.java
![MEMBERSHIP DATA CONSOLE](https://user-images.githubusercontent.com/59510531/103483059-ac29eb80-4e0a-11eb-90c9-d2899d5c5101.png)
#### Coding for MemberUI.Java
```  Java
/*  * MembUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
public class MembUI extends javax.swing.JFrame {
    /** Creates new form MembUI */
    public MembUI() {
        initComponents();
    }
    Statement stmt = null;
    ResultSet rs = null;        // ResultSet for publisher table.
    String SQL = "SELECT * FROM Member";
    private void cmdClearActionPerformed(java.awt.event.ActionEvent evt) {                                         
        txtMNo.setText("");
        txtMName.setText("");
        txtMAdd.setText("");
        txtMPh.setText("");
        txtMDate.setText("");
        txtMFee.setText("");
        txtMStatus.setText("");
        cmdSave.setEnabled(false);
}                                        
    private void cmdEditActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
        new MembEditUI().setVisible(true);
}                                       
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       
    private void cmdSaveActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Mno = Integer.parseInt(txtMNo.getText());
            String MName = txtMName.getText();
            String MAdd = txtMAdd.getText();
            String MPh1 = txtMPh.getText();
            String MDate = txtMDate.getText();
            String MEDate = txtMDate.getText();   // This is temporarily assigned same as membership date
            double MFee = Double.parseDouble(txtMFee.getText());
            char MStatus = 'Y'; // Member status is Y
            char MIssue = 'N'; // Book issue status is N
            int code = JOptionPane.showConfirmDialog(this, "Are you sure to add?", "Confirmation Dialog Box", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.INFORMATION_MESSAGE);
            if (code == JOptionPane.YES_OPTION) {
                String strSQL = "INSERT INTO Member(memb_no, memb_name, memb_add, memb_phone, mdate, medate, mfee, mem_status, mem_issue) VALUES ("+(Mno)+", '"+(MName)+"', '"+(MAdd)+"', '"+(MPh1)+"', '"+(MDate)+"', '"+(MEDate)+"', "+(MFee)+", '"+(MStatus)+"', '"+(MIssue)+"')";
                int rowsEffected = stmt.executeUpdate(strSQL);
                JOptionPane.showMessageDialog(this, "Record added successfully into Member table");
            }
            cmdSave.setEnabled(false);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                       

    private void cmdNewActionPerformed(java.awt.event.ActionEvent evt) {                                       
        txtMStatus.setText("Y");
        // Activate the Save button when New button clicked
        cmdSave.setEnabled(true);
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();   // Connection string for  ResultSet - rs.
            rs = stmt.executeQuery(SQL);
            int MNO=0, Mno = 0;
            while (rs.next()) {
                MNO = rs.getInt("memb_no");
            }
            MNO++;
            Mno = MNO;
            txtMNo.setText(Integer.toString(Mno));
            txtMName.setFocusable(true);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
}                                      
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtMNo.setEditable(false);
        txtMStatus.setEditable(false);
        // Deactivate the Save button when form loads
        cmdSave.setEnabled(false);
    }                                      
    private void cmdDelActionPerformed(java.awt.event.ActionEvent evt) {                                       
        this.setVisible(false);
        new MembDelUI().setVisible(true);
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MembUI().setVisible(true);
            }
        });
    }
  }
  ```
## Frame:  MembEditUI.java
![MEMBER EDITION FORM](https://user-images.githubusercontent.com/59510531/103483088-e7c4b580-4e0a-11eb-9255-fd6b75d0864f.png)
#### Coding for MembEditUI.java
``` Java
/*  * MembEditUI.java  **/
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class MembEditUI extends javax.swing.JFrame {
    /** Creates new form MembEditUI */
    public MembEditUI() {
        initComponents();
    }
         Statement stmt = null;
            ResultSet rs = null;
            String SQL = "SELECT * FROM Member";
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       
    private void cmdUpdateActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Mno = Integer.parseInt(txtMNo.getText().trim());
            String MName = txtMName.getText();
            String MAdd = txtMAdd.getText();
            String MPh1 = txtMPh.getText();
            String MDate = txtMDate.getText();
            String MEDate = txtMDate.getText();   // This is temporarily assigned same as membership date
            double MFee = Double.parseDouble(txtMFee.getText());
            char MStatus = 'Y'; // Member status is Y
            String strSQL = "Update Member set memb_name ='"+(MName)+"', memb_add = '"+(MAdd)+"', memb_phone = '"+(MPh1)+"', mdate = '"+(MDate)+"', mfee = "+(MFee)+" where memb_no = " + (Mno);
            int rowsEffected = stmt.executeUpdate(strSQL);
            if (rowsEffected == 0)
                JOptionPane.showMessageDialog(this, "Record does not exists");
            else
                JOptionPane.showMessageDialog(this,"Record modified");
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                         
  private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MembNo = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Member No into a variable
        String Mno =MembNo.trim().substring(0, 3);
        String query = "SELECT * FROM Member WHERE memb_no = " + (Mno) + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMStatus.setEditable(false);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Member table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtMNo.setEditable(false);
        txtMStatus.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                // To make the Member no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Mno.length() < 4)
                {
                    int x = Mno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Mno = Mno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Mno + "- " + MName);
            }
            jList1.setModel(dModel);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MembEditUI().setVisible(true);
            }
        });
    }
  }
```
## Frame:  MembDelUI.java
![member deletion form](https://user-images.githubusercontent.com/59510531/103483123-396d4000-4e0b-11eb-85af-4ad4e01a17f8.png)
#### Coding for MembDelUI.java
``` Java
/*  * MembDelUI.java  * */
import java.sql.*;
import javax.swing.JOptionPane;
import javax.swing.DefaultListModel;
public class MembDelUI extends javax.swing.JFrame {
    /** Creates new form MembDelUI */
    public MembDelUI() {
        initComponents();
    }
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Member";
    private void jList1MouseClicked(java.awt.event.MouseEvent evt) {                                    
        // getSelectedValue() method extracts the current cursor location value into a variable
        String MembNo = (String) jList1.getSelectedValue();
        // Extract the first 4 characters as Member No into a variable
        String Mno =MembNo.trim().substring(0, 3);
        String query = "SELECT * FROM Member WHERE memb_no = " + (Mno) + ";";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            // Create SQL statement and execute query.
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);
            if (rs.next()) {
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMStatus.setEditable(false);
            } else {
                JOptionPane.showMessageDialog(null, "Record does not found in Member table");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                   
    private void cmdExit1ActionPerformed(java.awt.event.ActionEvent evt) {                                         
        this.setVisible(false);
        //new MainUI().setVisible(true);
}                                        
    private void cmdDeleteActionPerformed(java.awt.event.ActionEvent evt) {                                          
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            int Mno = Integer.parseInt(txtMNo.getText().trim());
            // Steps to confirm deletion
            int opt = JOptionPane.showConfirmDialog(null, "Are you sure to delete this record ?");
            if (opt == JOptionPane.YES_OPTION) {
                try {
                    char stb = 'N';  // Member table
                    String strSQL = "Update Member set mem_status ='"+(stb)+"' where memb_no = " + (Mno);
                    int rowsEffected = stmt.executeUpdate(strSQL);
                    if (rowsEffected == 0)
                        JOptionPane.showMessageDialog(this, "Record does not exists");
                    else {
                        JOptionPane.showMessageDialog(this,"Record Deleted");
                        // Text boxes cleared
                        txtMNo.setText("");
                        txtMName.setText("");
                        txtMAdd.setText("");
                        txtMPh.setText("");
                        txtMDate.setText("");
                        txtMFee.setText("");
                        txtMStatus.setText("");
                    }
                } catch (Exception e) {
                    JOptionPane.showMessageDialog(null, "Unable to delete");
                }
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                         
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        txtMNo.setEditable(false);
        txtMName.setEditable(false);
        txtMAdd.setEditable(false);
        txtMPh.setEditable(false);
        txtMDate.setEditable(false);
        txtMFee.setEditable(false);
        txtMStatus.setEditable(false);
        // Creating a ListModel object dModel to perform DefaultListModel
        // method operations
        DefaultListModel dModel = (DefaultListModel) jList1.getModel();
        // Method to add elements into jList1 control
        dModel.clear();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            while (rs.next()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                // To make the Member no. as 4 digit because we will extract 4 digit from list value
		// in mouse click event.
                if (Mno.length() < 4)
                {
                    int x = Mno.length();
                    int nl = 4 - x;
                    while (nl > 0){
                        Mno = Mno + " ";
                        nl--;
                    }
                }
                dModel.addElement(Mno + "- " + MName);
            }
            jList1.setModel(dModel);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,e.getMessage());
            e.printStackTrace();
        }
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MembDelUI().setVisible(true);
            }
        });
    }
  }
```

## Frame:  MembNavUI.java
![member record navigation](https://user-images.githubusercontent.com/59510531/103483174-7802fa80-4e0b-11eb-9c66-bcff8ac4ff7a.png)
#### Coding for MemebNavUI.java
``` Java
/*  * MembNavUI.java * */
import java.sql.*;
import javax.swing.JOptionPane;
public class MembNavUI extends javax.swing.JFrame {
    /** Creates new form MembNavUI */
    public MembNavUI() {
        initComponents();
    }
// Global variables
    Statement stmt = null;
    ResultSet rs = null;
    String SQL = "SELECT * FROM Member";
    public void disable_textfields() {
        txtMNo.setEditable(false);
        txtMName.setEditable(false);
        txtMAdd.setEditable(false);
        txtMPh.setEditable(false);
        txtMDate.setEditable(false);
        txtMFee.setEditable(false);
        txtMStatus.setEditable(false);
        txtMIssue.setEditable(false);
    }
    private void cmdPrevActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.previous()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMIssue.setText(MIssue);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(true);
            } else {
                cmdPrev.setEnabled(false);
                JOptionPane.showMessageDialog(this, "You are at first position", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void cmdLastActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.last()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMIssue.setText(MIssue);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(false);
            } else {
                JOptionPane.showMessageDialog(this, "You are already at last record", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void cmdNextActionPerformed(java.awt.event.ActionEvent evt) {                                        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.next()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMIssue.setText(MIssue);
                cmdFirst.setEnabled(true);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(true);
                cmdLast.setEnabled(true);
            } else {
                cmdNext.setEnabled(false);
                JOptionPane.showMessageDialog(this, "You are at last record position", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                       
    private void cmdExitActionPerformed(java.awt.event.ActionEvent evt) {                                        
        this.setVisible(false);
}                                       
    private void cmdFirstActionPerformed(java.awt.event.ActionEvent evt) {                                         
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            if (rs.first()) {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMIssue.setText(MIssue);
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(true);
            } else {
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(false);
                JOptionPane.showMessageDialog(this, "Rhere is no record in table", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
}                                        
    private void formWindowGainedFocus(java.awt.event.WindowEvent evt) {                                       
        disable_textfields();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = (Connection)
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/Library","root","raj");
            stmt = con.createStatement();
            rs = stmt.executeQuery(SQL);
            if (rs.first())
            {
                String Mno = rs.getString("memb_no");
                String MName = rs.getString("memb_name");
                String MAdd = rs.getString("memb_add");
                String MPh1 = rs.getString("memb_phone");
                String MDate = rs.getString("mdate");
                String MEDate = rs.getString("medate");
                String MFee = rs.getString("mfee");
                String MStatus = rs.getString("mem_status");
                String MIssue = rs.getString("mem_issue");
                // Displaying the contents in respective text boxes.
                txtMNo.setText(Mno);
                txtMName.setText(MName);
                txtMAdd.setText(MAdd);
                txtMPh.setText(MPh1);
                txtMDate.setText(MDate);
                txtMFee.setText(MFee);
                txtMStatus.setText(MStatus);
                txtMIssue.setText(MIssue);
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(true);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(true);
            }
            else
            {
                cmdFirst.setEnabled(false);
                cmdNext.setEnabled(false);
                cmdPrev.setEnabled(false);
                cmdLast.setEnabled(false);
                JOptionPane.showMessageDialog(this, "Rhere is no record in table", "Student",0);
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e.getMessage());
        }
    }                                      
    /**    * @param args the command line arguments    */
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MembNavUI().setVisible(true);
            }
          }
        }
      }
```
