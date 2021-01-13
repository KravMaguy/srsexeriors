<?php
// $toEmail = "flex4lease@gmail.com";
// $mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
// if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
// print "<p class='success'>Contact Mail Sent.</p>";
// } else {
// print "<p class='Error'>Problem in Sending Mail.</p>";
// }
// exit;

$toEmail = "flex4lease@gmail.com";
$content = $_POST["name"]+" "+$_POST["address"]+" "+$_POST["phone"];
$mailHeaders = "From: " . $_POST["name"] . "<" . $_POST["email"] . ">\r\n";
if (mail($toEmail, 'test mail', $content, $mailHeaders)) {
// echo "<p class='success'>Contact Mail Sent.</p>";
    echo json_encode(['success' => true, 'content' => $content, 'sender' => $_POST["email"]]);
} else {
    echo "<p class='Error'>Problem in Sending Mail.</p>";
}
exit;






?>