<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload"]);
    exit;
}

// Destination email
// $to = "info@mirrormirrorphotowallqatar.net";
$to = "muhammadumarhassan987@gmail.com";

// Determine subject based on presence of eventType
if (isset($data['eventType']) && $data['eventType'] !== "") {
    $subject = "New Inquiry from Contact Page - Mirror Mirror";
} else {
    $subject = "New Inquiry from Home Page - Mirror Mirror";
}

// Sanitize inputs
$name = isset($data['name']) ? htmlspecialchars(strip_tags(trim($data['name']))) : "Unknown";
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : "No Email";
$phone = isset($data['phone']) ? htmlspecialchars(strip_tags(trim($data['phone']))) : "N/A";
$message = isset($data['message']) ? htmlspecialchars(strip_tags(trim($data['message']))) : "";

// Contact page specific fields
$eventType = isset($data['eventType']) ? htmlspecialchars(strip_tags(trim($data['eventType']))) : "";
$date = isset($data['date']) ? htmlspecialchars(strip_tags(trim($data['date']))) : "";
$location = isset($data['location']) ? htmlspecialchars(strip_tags(trim($data['location']))) : "";
$guestCount = isset($data['guestCount']) ? htmlspecialchars(strip_tags(trim($data['guestCount']))) : "";
$vision = isset($data['vision']) ? htmlspecialchars(strip_tags(trim($data['vision']))) : "";

// Build email content
$emailBody = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='font-family: sans-serif; line-height: 1.6; color: #333;'>";
$emailBody .= "<div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;'>";
$emailBody .= "<h2 style='color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;'>New Inquiry Received</h2>";
$emailBody .= "<p><strong>Name:</strong> {$name}</p>";
$emailBody .= "<p><strong>Email:</strong> {$email}</p>";

if ($phone !== "N/A") {
    $emailBody .= "<p><strong>Phone:</strong> {$phone}</p>";
}
if ($eventType !== "") {
    $emailBody .= "<p><strong>Event Type:</strong> {$eventType}</p>";
}
if ($date !== "") {
    $emailBody .= "<p><strong>Event Date:</strong> {$date}</p>";
}
if ($location !== "") {
    $emailBody .= "<p><strong>Location:</strong> {$location}</p>";
}
if ($guestCount !== "") {
    $emailBody .= "<p><strong>Guest Count:</strong> {$guestCount}</p>";
}

if ($message !== "") {
    $emailBody .= "<p><strong>Message:</strong><br/>" . nl2br($message) . "</p>";
}
if ($vision !== "") {
    $emailBody .= "<p><strong>Vision:</strong><br/>" . nl2br($vision) . "</p>";
}

$emailBody .= "</div></body></html>";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: Mirror Mirror Website <info@mirrormirrorphotowallqatar.net>" . "\r\n";
$headers .= "Reply-To: {$name} <{$email}>" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $emailBody, $headers)) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email."]);
}
?>