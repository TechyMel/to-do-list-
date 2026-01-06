<?php

$DB_HOST = "localhost:3306";
$DB_NAME = "todo_app";
$DB_USER = "root";
$DB_PASS = "Admin";

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $error) {
    die("DB connection failed: " . $error->getMessage());
}

?>