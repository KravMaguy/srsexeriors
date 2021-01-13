<?php
// $toEmail = "flex4lease@gmail.com";
// $mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
// if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
// print "<p class='success'>Contact Mail Sent.</p>";
// } else {
// print "<p class='Error'>Problem in Sending Mail.</p>";
// }
// exit;
if (isset($_POST["name"]) && !empty($_POST["name"]) && isset($_POST["address"]) && !empty($_POST["address"]) && isset($_POST["email"]) && !empty($_POST["email"]) && isset($_POST["phone"]) && !empty($_POST["phone"])) {
    $date=$_POST["date"];
    $time=$_POST["time"];
    $type=$_POST["type"];
    $description=$_POST["description"];
    $toEmail = "flex4lease@gmail.com";
    $name = $_POST["name"];
    $address = $_POST["address"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $content = " name: " . $name . "\n address: " . $address . "\n phone: " . $phone . "\n appointment date: " . $date . "\n appointment time: " . $time . "\n project type: " . $type . "\n project description: " . $description;
    $mailHeaders = "From: " . $name . "<" . $email . ">\r\n";
    if (mail($toEmail, 'test mail', $content, $mailHeaders)) {
        echo json_encode(['success' => true, 'content' => $content, 'sender' => $email]);
    } else {
        echo "<p class='Error'>Problem in Sending Mail.</p>";
    }
    exit;

}
