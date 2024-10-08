<?php
// Database connection settings
$host = 'localhost'; // Change if needed
$dbname = 'hopital_db'; // Your database name
$username = 'root'; // MySQL username (default for XAMPP)
$password = ''; // MySQL password (default for XAMPP)

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to get hospital data and calculate average wait time
$sql = "
    SELECT 
        h.id, 
        h.Nom, 
        h.Rue, 
        h.Ville, 
        h.CP, 
        h.PMR, 
        h.longitude, 
        h.latitude,
        AVG(TIMESTAMPDIFF(MINUTE, a.arrive, a.depart)) AS avg_wait_time
    FROM 
        hopitaux h
    LEFT JOIN 
        attente a 
    ON 
        h.id = a.hop_id
    GROUP BY 
        h.id;
";

// Execute the query
$result = $conn->query($sql);

// Initialize an array to hold the result
$hospitals = array();

if ($result->num_rows > 0) {
    // Fetch all rows and push them into the hospitals array
    while($row = $result->fetch_assoc()) {
        // Push each hospital data along with the calculated average wait time
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
