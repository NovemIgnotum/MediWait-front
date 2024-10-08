<?php
// Database connection settings
$host = 'localhost';
$dbname = 'hopital_db';  // The name of the database you created
$username = 'root';       // The default XAMPP/MAMP username for MySQL
$password = '';           // The default password (leave empty for XAMPP, for MAMP it's 'root')

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to get all hospitals
$sql = "SELECT * FROM hopitaux";
$result = $conn->query($sql);

$hospitals = array();

if ($result->num_rows > 0) {
    // Fetch all rows and push them into the hospitals array
    while($row = $result->fetch_assoc()) {
        $hospitals[] = $row;
    }
}

// Close the connection
$conn->close();

// Set the Content-Type header for JSON output
header('Content-Type: application/json');

// Output the data as JSON
echo json_encode($hospitals);
?>
