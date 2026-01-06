<?php
// php/api_todos.php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["error" => "Not logged in"]);
    exit;
}

require __DIR__ . "/config.php";
$userId = $_SESSION["user_id"];
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        // List todos
        $stmt = $pdo->prepare("SELECT id, text, done FROM todos WHERE user_id = :uid ORDER BY created_at DESC");
        $stmt->execute([":uid" => $userId]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        // Add new todo
        $input = json_decode(file_get_contents("php://input"), true);
        $text = trim($input["text"] ?? "");
        if ($text === "") {
            http_response_code(400);
            echo json_encode(["error" => "Text required"]);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO todos (user_id, text) VALUES (:uid, :text)");
        $stmt->execute([":uid" => $userId, ":text" => $text]);
        echo json_encode(["id" => $pdo->lastInsertId(), "text" => $text, "done" => 0]);
        break;

    case "PUT":
        // Toggle done
        parse_str($_SERVER["QUERY_STRING"] ?? "", $qs);
        $id = (int)($qs["id"] ?? 0);
        $input = json_decode(file_get_contents("php://input"), true);
        $done = !empty($input["done"]) ? 1 : 0;

        $stmt = $pdo->prepare("UPDATE todos SET done = :done WHERE id = :id AND user_id = :uid");
        $stmt->execute([":done" => $done, ":id" => $id, ":uid" => $userId]);
        echo json_encode(["success" => true]);
        break;

    case "DELETE":
        // Delete todo
        parse_str($_SERVER["QUERY_STRING"] ?? "", $qs);
        $id = (int)($qs["id"] ?? 0);

        $stmt = $pdo->prepare("DELETE FROM todos WHERE id = :id AND user_id = :uid");
        $stmt->execute([":id" => $id, ":uid" => $userId]);
        echo json_encode(["success" => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
}
?>