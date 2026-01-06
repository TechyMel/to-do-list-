<?php
// php/logout.php
session_start();
$_SESSION = [];
session_destroy();
header("Location: /public/index.html");
?>