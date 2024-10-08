<?php
// Database connection settings
$host = 'localhost';
$dbname = 'hopital_db'; // Your database name
$username = 'root'; // MySQL username
$password = ''; // MySQL password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to generate random times
function randomTime($minMinutes, $maxMinutes) {
    return rand($minMinutes * 60, $maxMinutes * 60); // Convert minutes to seconds
}

// Inserting dummy data
for ($i = 1; $i <= 10; $i++) { // Loop over hospital IDs from 1 to 10
    for ($j = 0; $j < rand(5, 15); $j++) { // Create 5 to 15 entries per hospital
        $arrive_offset = randomTime(30, 180); // Random arrival time between 30 and 180 minutes ago
        $depart_offset = $arrive_offset - randomTime(10, 60); // Depart 10-60 minutes after arrival

        $sql = "
            INSERT INTO attente (hop_id, arrive, depart, created_at)
            VALUES (
                $i,
                ADDTIME(NOW(), '-" . gmdate("H:i:s", $arrive_offset) . "'),
                ADDTIME(NOW(), '-" . gmdate("H:i:s", $depart_offset) . "'),
                NOW()
            );
        ";

        if (!$conn->query($sql)) {
            echo "Error: " . $conn->error;
        }
    }
}

// Close connection
$conn->close();

echo "Dummy data inserted successfully.";
?>
