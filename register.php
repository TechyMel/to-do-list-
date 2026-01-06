<?php 
session_start();
require "./config.php";

$base = "/CSC118Project/public/"; // <<< UPDATE THIS IF YOUR FOLDER NAME CHANGES

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? "");
$password = trim($data["password"] ?? "");

// Validate
if ($username === "" || $password === "") {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Check if user exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = :u LIMIT 1");
$stmt->execute([":u" => $username]);
if ($stmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Username already taken."]);
    exit;
}

// Hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (:u, :p)");
$success = $stmt->execute([
    ":u" => $username,
    ":p" => $hashed
]);

if ($success) {
    echo json_encode([
        "success" => true,
        "message" => "Account created!",
        "redirect" => $base . "login.html"
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Error creating account."]);
}
?>

