<?php
// api.php - Controlador de datos
header('Content-Type: application/json');
require_once 'db.php';

$action = $_GET['action'] ?? '';

switch($action) {
    case 'getProducts':
        $stmt = $pdo->query("SELECT id, nombre, precio, categoria, imagen, stock FROM productos");
        echo json_encode($stmt->fetchAll());
        break;

    case 'addToCart':
        $id = $_POST['id'] ?? 0;
        $talle = $_POST['talle'] ?? '';
        
        // Validación de stock simple
        $stmt = $pdo->prepare("SELECT stock FROM productos WHERE id = ?");
        $stmt->execute([$id]);
        $producto = $stmt->fetch();

        if ($producto && $producto['stock'] > 0) {
            echo json_encode(['success' => true, 'message' => 'Agregado al carrito']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Sin stock disponible']);
        }
        break;

    default:
        echo json_encode(['error' => 'Acción no válida']);
}
?>