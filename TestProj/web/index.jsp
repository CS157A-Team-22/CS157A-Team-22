<%@ page import="java.sql.*"%>
<%@ page import="java.util.ArrayList" %>
<html>
<head>
  <title>Library Example</title>

</head>
<body>
<h1>Library Management Example</h1>

<input type="button" value="Click to be welcomed"> <br/><br/>

<script >
  button = document.querySelector('input');

  button.addEventListener('click', sendAlert);

  function sendAlert()
  {
    alert('Welcome to our application!');
  }
</script>

<%
  String db = "cs157a";
  String user;
  user = "root";
  String password = "spartan007";
  try {
    java.sql.Connection con;
    try
    {
      Class.forName("com.mysql.jdbc.Driver");
    } catch (ClassNotFoundException e)
    {
      e.printStackTrace();
    }
    con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cs157a?serverTimezone=EST5EDT",user, password);
    out.println(db + " database successfully opened.<br/><br/>");


    Statement stmt = con.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM test_books");
    ArrayList<String> rows = new ArrayList<>();
    ArrayList<Integer> row_sizes = new ArrayList<>();
    while (rs.next())
    {
      String next_row = "id: " + rs.getInt(1) + ", " + rs.getString(2) + ", written in the year " + rs.getInt(3);
      rows.add(next_row);
      row_sizes.add(next_row.length());
    }
    int row_size_max = 0;
    for (int i : row_sizes)
    {
      if (i > row_size_max)
        row_size_max = i;
    }

    for (int i = 0; i < row_size_max + 10; i++)
    {
      out.print('-');
    }
    out.print("<br/>");


    for (int i = 0; i < rows.size(); i++)
    {
      out.print("| ");
      out.print(rows.get(i));
      for (int j = row_sizes.get(i) + 2; j < row_size_max; j++)
      {
        out.print(" ");
      }
      out.print(" |<br/>");
    }
    for (int i = 0; i < row_size_max + 10; i++)
    {
      out.print('-');
    }
    out.println("");

    rs.close();
    stmt.close();
    con.close();
  }
  catch(SQLException e)
  {
    out.println("SQLException caught: " + e.getMessage());
  }
%>
</body>
</html>
