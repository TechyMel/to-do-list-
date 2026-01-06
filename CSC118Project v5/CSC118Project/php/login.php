<?php
// validating user login and calling config.php and posting to index.html

session_start();
require "./config.php";

// might need to update the path

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    
    $username = trim($_POST["username"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if ($username === "" || $password === "") {
        header("Location: /public/login.html?error=empty");
        exit;
    }

    $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE username = :u LIMIT 1");
    $stmt->execute([":u" => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password_hash"])) {
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $username;
        header("Location: /public/todo.html");
        exit;
    } else {
        header("Location: /public/login.html?error=invalid");
        error_log("USER ROW: " . print_r($user, true));
        error_log("USER ROW: " . print_r($password, true));
        error_log("hashed pass:" . password_hash($password, PASSWORD_BCRYPT));
        exit;
    }
} else {
    header("Location: /public/login.html");
    exit;
}


?>