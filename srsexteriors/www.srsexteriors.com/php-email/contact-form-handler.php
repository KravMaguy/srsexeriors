<?php
if (isset($_POST["name"]) && !empty($_POST["name"]) && isset($_POST["email"]) && !empty($_POST["email"]) && isset($_POST["phone"]) && !empty($_POST["phone"])
&&!empty($_POST["details"]) && isset($_POST["details"])
) {
    $description=$_POST["details"];
    $toEmail = "flex4lease@gmail.com";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $content = " name: " . $name . "\n address: " . $address . "\n phone: " . $phone . "\n comment description: " . $description;
    $mailHeaders = "From: " . $name . "<" . $email . ">\r\n";
    if (mail($toEmail, 'test mail', $content, $mailHeaders)) {
        echo json_encode(['success' => true, 'content' => $content, 'sender' => $email]);
    } else {
        echo json_encode(['status'=>'post values set but failed','success' => false]);
    }
    exit;

} else {
    echo json_encode(['status'=>'fail']);
    exit;
}
