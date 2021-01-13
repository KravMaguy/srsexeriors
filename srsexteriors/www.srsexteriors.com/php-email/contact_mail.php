<?php
$toEmail = "flex4lease@gmail.com";
$mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
// print "<p class='success'>Contact Mail Sent.</p>";
echo json_encode(['success'=>true]); 
} else {
    echo json_encode(['success'=>false]);
// print "<p class='Error'>Problem in Sending Mail.</p>";
}
exit;


?>