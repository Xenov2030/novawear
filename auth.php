<?php
// auth.php - Manejo de sesión asíncrona
header('Content-Type: application/json');
require_once 'db.php';
session_start();

$action = $_POST['action'] ?? '';
$email  = $_POST['email'] ?? '';
$pass   = $_POST['pass'] ?? '';

if (empty($email) || empty($pass)) {
    echo json_encode(['success' => false, 'message' => 'Completa todos los campos']);
    exit;
}

if ($action === 'register') {
    $hash = password_hash($pass, PASSWORD_DEFAULT);
    try {
        $stmt = $pdo->prepare("INSERT INTO usuarios (email, password) VALUES (?, ?)");
        $stmt->execute([$email, $hash]);
        echo json_encode(['success' => true, 'message' => 'Registro exitoso']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'El email ya existe']);
    }
} 

if ($action === 'login') {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($pass, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(['success' => true, 'message' => 'Acceso concedido']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    }
}
?>